const Router = require('express').Router;
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const striptags = require('striptags');

const Media = require('../models/media.model');
const Post = require('../models/post.model');
const createIndex = require('../elasticClient/createIndex');
const bulkInsertPosts = require('../elasticClient/bulkInsertPosts');
const elasticSearchHelper = require('../elasticClient/helper');
const logger = require('../logger');

const {
    validatePost, validateSetPublished, 
    validateDeleteMedia, validateGetMedia,
    validateGetPosts, validateGetPost,
    validateEditPost
} = require('../utils/serverValidations');
const generateIdFromPostTitle = require('../utils/generateIdFromPostTitle');
const findAttachedMedia = require('../utils/findAttachedMedia');

const dashboardRouter = Router();

dashboardRouter.post('/savePost', async (req, res) => {
    const error = validatePost(req.body);
    if (error) {
        logger.error('Post validation failed with error:', { error, body: req.body });
        return res.status(400).json({ error: true, msg: 'Incorrect info submitted!' });
    }
    
    let {
        title,
        headerImageURL,
        metaDescription,
        metaKeywords,
        postedDate = Date.now(),
        body,
        published = 0,
    } = req.body;

    // trim the title, replace all spaces with hyphen
    const _id = generateIdFromPostTitle(title);

    const attachedMedia = findAttachedMedia(headerImageURL, body);

    const savedPost = await Post.savePost({
        _id, title, headerImageURL, metaKeywords,
        metaDescription, postedDate, body, published,
        media: attachedMedia
    });
    if (savedPost) {
        let body = savedPost.body.replace(/\s/ig, ' ')
                    .replace(/<code.*?<\/code>/ig, '');

        body = decodeURI(striptags(body));
        const elasticPostBody = {
            id: savedPost._id,
            title: savedPost.title,
            body,
            published: savedPost.published,
            postedDate: savedPost.postedDate
        };
        const { error } = await elasticSearchHelper.addPost(elasticPostBody);
        if (error) {
            logger.error('Cannot index post', post, error);
            // delete the savedPost
            await Post.deleteOne({ _id: savedPost._id });
            return res.json({
                error: true,
                msg: 'The post could not be indexed by elastic client! The post was removed. Please try again!'
            });
        }
        return res.json({ 
            error: false, 
            post: savedPost 
        });
    } else {
        res.json({ 
            error: true,
            msg: 'Something went wrong while saving the post! Please check the server logs.'
        });
    }
});

dashboardRouter.get('/bulkIndex', async (req, res) => {
    let error = await createIndex();
    if (error) {
        return res.status(500).json({ error: true, msg: 'Something went wrong!', reason: error });
    }
    let response = await bulkInsertPosts();
    if (response.error) {
        return res.status(500).json({ error: true, msg: 'Something went wrong!', reason: error });
    }

    return res.json({ error: false, msg: `${response.postCount} posts indexed!` });
});

dashboardRouter.get('/getPosts', async (req, res) => {
    const error = validateGetPosts(req.query);
    if (error) {
        logger.error('Get posts validation failed with error:', { error, query: req.query });
        return res.status(400).json({ error: true, msg: 'Incorrect info submitted!' });
    }

    // published can be 1, 0 or 'all'
    let {
        published='all', sortBy, sortOrder=-1, skip=0, limit=10
    } = req.query;

    skip = parseInt(skip) || 0;
    limit = parseInt(limit) || 10;
    sortOrder = parseInt(sortOrder) || -1;

    const { posts, count } = await Post.getPosts({ published, sortBy, sortOrder, skip, limit });
    if (!posts) {
        return res.status(500).json({ error: true, msg: 'Something went wrong!' });
    }

    return res.json({
        error: false,
        data: posts,
        count
    });
});

dashboardRouter.get('/getPost', async (req, res) => {
    const error = validateGetPost(req.query);
    if (error) {
        logger.error('Get post validation failed with error', { error, query: req.query });
        return res.status(400).json({ error: true, msg: 'Incorrect info submitted!' });
    }
    const { id } = req.query;
    const post = await Post.getPost({ id, admin: !!req.admin });
    if (!post) {
        return res.status(404).json({ error: true, msg: 'No post found' });
    }
    return res.json({ error: false, data: post });
});

dashboardRouter.post('/setPublished', async (req, res) => {
    const error = validateSetPublished(req.body);
    if (error) {
        logger.error('Post validation failed with error:', { error, body: req.body });
        return res.status(400).json({ error: true, msg: 'Incorrect info submitted!' });
    }
    const { _id, published } = req.body;
    try {
        const post = await Post.setPublished(_id, published);
        /*const { error } = */ await elasticSearchHelper.updatePost(_id, { published });

        const { media } = post ? post : { media: [] };

        await Media.updateMedias(media, {
            $inc: { usedInPosts: published ? 1 : -1 }
        });

        return res.json({
            error: false
        });
    } catch (err) {
        logger.error('Error in setPublished:', err);
        return res.json({ error: true })
    }
});

dashboardRouter.patch('/editPost', async (req, res) => {
    const error = validateEditPost(req.body);
    if (error) {
        logger.error('Post validation failed with error:', { error, body: req.body });
        return res.status(400).json({ error: true, msg: 'Incorrect info submitted!' });
    }
    
    let {
        title,
        headerImageURL,
        metaDescription,
        metaKeywords,
        body,
        _id,
        keepOldId=true
    } = req.body;

    let oldPost = await Post.findOne({ _id });
    if (!oldPost) {
        return res.status(500).json({ error: true, msg: 'Post not found with that id'});
    }

    let newPost = oldPost;
    let newAttachedMedia = findAttachedMedia(headerImageURL, body);
    let newPostId = generateIdFromPostTitle(title);

    console.log({ newPostId, oldPostId: oldPost._id, keepOldId });
    // create a new post, deleting old one, only if forced to do so
    if (newPostId !== oldPost._id && !keepOldId) {
        // delete old post
        await Post.deleteOne({ _id: oldPost._id });
        try {
            await elasticSearchHelper.deletePost(oldPost._id);  
        } catch (error) {} // not a fatal error
        
        // index in elastic search
        let newId = generateIdFromPostTitle(title);

        try {
            newPost = await Post.savePost({
                _id: newId, title, headerImageURL, metaKeywords,
                metaDescription, postedDate: oldPost.postedDate,
                body, published: oldPost.published, media: newAttachedMedia
            });

            let newBody = body
                            .replace(/\s/ig, ' ')
                            .replace(/<code.*?<\/code>/ig, '');

            newBody = decodeURI(striptags(newBody));
            const elasticPostBody = {
                id: newPost._id,
                title: newPost.title,
                body: newBody,
                published: newPost.published,
                postedDate: newPost.postedDate
            };
            await elasticSearchHelper.addPost(elasticPostBody)
        } catch (error) {
            // we do not want to delete this post from db here unlike in savePost
            logger.error('Edit post cannot add updated post to elasticsearch', error);
        } 
    } else {
        // update the old post
        newPost = await Post.updatePost(oldPost._id, {
            title, headerImageURL, metaDescription, metaKeywords, body
        });
        try {
            let newBody = newPost.body
                                    .replace(/\s/ig, ' ')
                                    .replace(/<code.*?<\/code>/ig, '');

            newBody = decodeURI(striptags(newBody));
            const elasticPostUpdates = {
                title: newPost.title,
                body: newBody
            };
            await elasticSearchHelper.updatePost(newPost._id, elasticPostUpdates);
        } catch (error) {
            logger.error('Cannot update post', error);
        }
    }

    // find current attached media
    const newMedia = findAttachedMedia(newPost.headerImageURL, newPost.body);
    const oldMedia = oldPost.media;
    if (newPost.published) {
        // decrement usedInPosts for oldMedia
        await Media.updateMedias(oldMedia, { $inc: {usedInPosts: -1} });
        // increment usedInPosts for newMedia
        await Media.updateMedias(newMedia, { $inc: {usedInPosts: 1} });
    }

    return res.json({ error: false, msg: 'Post updated successfully!' });
});

// MEDIA RELATED CODE
// multer init
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/static/blogs'),
    filename: (req, file, cb) => {
        let filePath = path.join(__dirname, '../public/static/blogs', file.originalname.toLowerCase());
        if (fs.existsSync(filePath)) {
            const newFilename = `${file.originalname.toLowerCase().split('.')[0]}-${Date.now()}.${file.originalname.split('.')[1]}`.replace(/ /g, '');
            cb(null, newFilename);
        } else {
            cb(null, file.originalname.replace(/ /g, ''));
        }
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 20 * 1e6, // 20MB
        files: 1
    },
    fileFilter: (req, file, cb) => {
        // check if mimetype begins with image or video
        let isFileAccepted = /^(image|video)/i.test(file.mimetype);

        cb(null, isFileAccepted);
    }
}).single('file');

dashboardRouter.post('/uploadMedia', (req, res, next) => {
    upload(req, res, async err => {
        if (err) {
            logger.error('File upload error:', err);
            next(err);
        } else {
            await Media.saveMedia({ _id: req.file.filename });
            res.json({
                error: false,
                path: `/static/blogs/${req.file.filename}`
            });
        }
    });
});

dashboardRouter.get('/getMedia', async (req, res) => {
    const error = validateGetMedia(req.query);
    if (error) {
        logger.error('Get media validation failed with error', error);
        return res.status(400).json({ error: true, msg: 'Incorrect query params!' });
    }
    let {skip=0, limit=10, sortBy, sortOrder=-1} = req.query;

    skip = parseInt(skip) || 0;
    limit = parseInt(limit) || 10
    limit = Math.min(50, limit);
    sortOrder = parseInt(sortOrder) || -1;

    const { media, count } = await Media.getMedia({ sortBy, sortOrder, skip, limit });

    res.json({ error: false, data: media, count });
});

dashboardRouter.delete('/deleteMedia', async (req, res) => {
    const error = validateDeleteMedia(req.body);
    if (error) {
        logger.error('Media delete validation failed with error:', { error, body: req.body });
        return res.status(400).json({ error: true, msg: 'Incorrect info submitted!' });
    }

    const { _id } = req.body;    
    const media = await Media.deleteMedia(_id);

    if (!media) {
        logger.error('Media to delete not found in db', { _id });
        return res.status(400).json({ error: true, msg: 'Invalid media name!' })
    }

    const mediaPath = path.join(__dirname, '../public/static/blogs/', media._id);
    try {
        fs.statSync(mediaPath);
        fs.unlinkSync(mediaPath);
        logger.info('File deleted successfully!', { _id });
        res.json({ error: false });
    } catch (error) {
        logger.error('File not found in file system', error);
        res.json({ error: true, msg: 'Something went wrong!' });
    }
});

module.exports = dashboardRouter;

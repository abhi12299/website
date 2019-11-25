const Router = require('express').Router;
const striptags = require('striptags');

const Post = require('../models/post.model');
const createIndex = require('../elasticClient/createIndex');
const bulkInsertPosts = require('../elasticClient/bulkInsertPosts');
const elasticSearchHelper = require('../elasticClient/helper');
const logger = require('../logger');

const {
    validatePost, validateSetPublished
} = require('../utils/serverValidations');

const dashboardRouter = Router();

dashboardRouter.post('/savePost', async (req, res) => {
    const error = validatePost(req.body);
    if (error) {
        logger.error('Post validation failed with error:', { error, body: req.body });
        return res.status(400).json({ error: true, msg: 'Incorrect info submitted!' });
    }
    
    const {
        title,
        headerImageURL,
        metaDescription,
        metaKeywords,
        postedDate = Date.now(),
        body,
        published = 0,
    } = req.body;

    // trim the title, replace all spaces with hyphen
    const _id = title
                .trim()
                .toLowerCase()
                .replace(/\s/g, '-')
                .replace(/[^\w\-]/g, '')
                .substr(0, 200);
    
    const savedPost = await Post.savePost({
        _id, title, headerImageURL, metaKeywords,
        metaDescription, postedDate, body, published
    });
    if (savedPost) {
        let body = savedPost.body.replace(/\s/ig, ' ')
                    .replace(/<code.*?<\/code>/ig, '');
        const elasticPostBody = {
            id: savedPost._id,
            title: savedPost.title,
            body: striptags(body),
            published: savedPost.published,
            postedDate: savedPost.postedDate
        };
        const { error } = await elasticSearchHelper.addPost(elasticPostBody);
        if (error) {
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
    let {
        published, sortBy, sortOrder=-1, skip=0, limit=10
    } = req.query;

    skip = parseInt(skip) || 0;
    limit = parseInt(limit) || 10;
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

dashboardRouter.post('/setPublished', async (req, res) => {
    const error = validateSetPublished(req.body);
    if (error) {
        logger.error('Post validation failed with error:', { error, body: req.body });
        return res.status(400).json({ error: true, msg: 'Incorrect info submitted!' });
    }
    const { _id, published } = req.body;
    try {
        await Post.setPublished(_id, published);
        return res.json({
            error: false
        });
    } catch (err) {
        logger.error('Error in setPublished:', err);
        return res.json({ error: true })
    }
});

module.exports = dashboardRouter;

const Router = require('express').Router;
const striptags = require('striptags');

const Post = require('../models/post.model');
const elasticSearchHelper = require('../elasticClient/helper');
const logger = require('../logger');

const { validatePost } = require('../utils/serverValidations');

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
        _id, title, headerImageURL, metaDescription, postedDate, body, published
    });
    if (savedPost) {
        const elasticPostBody = {
            id: savedPost._id,
            body: {
                title: savedPost.title,
                text: striptags(savedPost.body),
                published: savedPost.published
            }
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

module.exports = dashboardRouter;

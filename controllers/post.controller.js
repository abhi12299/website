const Router = require('express').Router;

const Post = require('../models/post.model');
const logger = require('../logger');

const {
    validateGetPost,
    validateGetLatestPosts,
    validateGetAllPosts
} = require('../utils/serverValidations');

const postRouter = Router();

postRouter.get('/getPost', async (req, res) => {
    const error = validateGetPost(req.query);
    if (error) {
        logger.error('Query params validation fail on /getPost:', { error, query: req.query });
        return res.status(400).json({ error: true, msg: 'Incorrect info submitted!' });
    }

    const { id } = req.query;

    const post = await Post.getPost({ id, admin: !!req.admin });
    if (!post) {
        return res.status(404).json({ error: true, msg: 'No post found' });
    }
    
    return res.json({ error: false, data: post });
});

postRouter.get('/getLatestPosts', async (req, res) => {
    const error = validateGetLatestPosts(req.query);
    if (error) {
        logger.error('Query params validation fail on /getLatestPosts', { error, query: req.query })
        return res.status(400).json({ error: true, msg: 'Incorrect info submitted!' });
    }

    let { limit=5 } = req.query;
    limit = parseInt(limit) || 5;

    const posts = await Post.getLatestPosts({ limit });
    return res.json({ error: false, data: posts });
});

// get all published posts w/ pagination
postRouter.get('/getAllPosts', async (req, res) => {
    const error = validateGetAllPosts(req.query);
    if (error) {
        logger.error('Query params validation fail on /getAllPosts', { error, query: req.query });
        return res.status(400).json({ error: true, msg: 'Incorrect info submitted!' });
    }

    let {
        skip, limit, keywords // match metaKeywords
    } = req.query;
    skip = parseInt(skip) || 0;
    limit = parseInt(limit) || 10;

    const { posts, count } = await Post.getAllPosts({ skip, limit, keywords });
    return res.json({ error: false, data: posts, count });
});

module.exports = postRouter;

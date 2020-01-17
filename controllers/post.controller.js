const Router = require('express').Router;

const Post = require('../models/post.model');
const logger = require('../logger');

const {
    validateGetPost
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

module.exports = postRouter;
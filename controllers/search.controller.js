const Router = require('express').Router;

const Post = require('../models/post.model');
const logger = require('../logger');

const {
    validateSearchSuggestions,
    validateSearch
} = require('../utils/serverValidations');

const searchRouter = Router();

searchRouter.get('/suggestions', async (req, res) => {
    const error = validateSearchSuggestions(req.query);
    if (error) {
        logger.error('Query params validation fail on /suggestions:', { error, query: req.query });
        return res.status(400).json({ error: true, msg: 'Incorrect info submitted!' });
    }

    let {
        q, sortBy='postedDate', sortOrder='-1', published='all' // by default all posts will be searched
    } = req.query;
    if (!req.admin) {
        published = '1'; // ignore published query
    }

    const { data, error:err } = await Post.getSuggestions({ q, sortBy, sortOrder, published });
    return res.json({ error: err, data });
});

searchRouter.get('/search', async (req, res) => {
    const error = validateSearch(req.query);
    if (error) {
        logger.error('Query params validation fail on /search:', { error, query: req.query });
        return res.status(400).json({ error: true, msg: 'Incorrect info submitted!' });
    }

    let {
        skip='0', limit='10', q,
        sortBy='postedDate', sortOrder='-1', 
        published='all' // by default all posts will be searched
    } = req.query;
    if (!req.admin) {
        published = '1'; // ignore published query
    }

    skip = parseInt(skip);
    limit = parseInt(limit);

    const { data, error:err, count } = await Post.getSearchResults({ q, sortBy, sortOrder, published, skip, limit });
    return res.json({ error: err, data, count });
});

module.exports = searchRouter;

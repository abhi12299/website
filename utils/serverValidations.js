const Joi = require('joi');

function validatePost({title, headerImageURL, metaKeywords,
    metaDescription, postedDate = Date.now(), body, published = 0}) {
    const postSchema = Joi.object({
        title: Joi.string().required(),
        headerImageURL: Joi.string().required(),
        metaDescription: Joi.string().required(),
        postedDate: Joi.number().required(),
        body: Joi.string().required(),
        published: Joi.number().allow(0, 1).required(),
        metaKeywords: Joi.array().items(Joi.string()).required()
    });

    const { error } = Joi.validate({
        title, headerImageURL, metaDescription, 
        postedDate, body, published, metaKeywords
    }, postSchema);
    return error;
}

function validateSetPublished(body) {
    const schema = Joi.object({
        _id: Joi.string().required(),
        published: Joi.number().allow(0, 1).required()
    });
    const { error } = Joi.validate(body, schema);
    return error;
}

function validateDeleteMedia(body) {
    const schema = Joi.object({
        _id: Joi.string().required()
    });
    const { error } = Joi.validate(body, schema);
    return error;
}

function validateGetMedia(query) {
    const schema = Joi.object({
        skip: Joi.string().regex(/^\d+$/).default('0'),
        limit: Joi.string().regex(/^\d+$/).default('20'),
        sortBy: Joi.string().regex(/^(usedInPublishedPosts|createdAt)$/),
        sortOrder: Joi.string().regex(/^(-1|1)$/).default('-1')
    });

    const { error } = Joi.validate(query, schema);
    return error;
}

const validateGetPosts = query => {
    const schema = Joi.object({
        skip: Joi.string().regex(/^\d+$/),
        limit: Joi.string().regex(/^\d+$/),
        sortBy: Joi.string().regex(/^(postedDate)$/),
        sortOrder: Joi.string().regex(/^(-1|1)$/),
        published: Joi.string().regex(/^(1|0|all)$/)
    });

    const { error } = Joi.validate(query, schema);
    return error;
};

const validateGetPost = query => {
    const schema = Joi.object({
        id: Joi.string().required()
    });

    const { error } = Joi.validate(query, schema);
    return error;
};

const validateEditPost = ({title, headerImageURL, metaKeywords,
    metaDescription, body}) => {
    const schema = Joi.object({
        title: Joi.string(),
        headerImageURL: Joi.string(),
        metaDescription: Joi.string(),
        body: Joi.string(),
        metaKeywords: Joi.array().items(Joi.string()),
        keepOldId: Joi.bool()
    });
    const { error } = Joi.validate({
        title, headerImageURL, metaDescription, 
        body, metaKeywords
    }, schema);
    return error;  
};

const validateSearchSuggestions = query => {
    const schema = Joi.object({
        q: Joi.string().required(),
        sortBy: Joi.string().regex(/^(postedDate)$/i),
        sortOrder: Joi.string().regex(/^(1|-1)$/i),
        published: Joi.string().regex(/^(1|0|all)$/i)
    });
    const { error } = Joi.validate(query, schema);
    return error;
};

const validateSearch = query => {
    const schema = Joi.object({
        q: Joi.string().required(),
        sortBy: Joi.string().regex(/^(postedDate)$/i),
        sortOrder: Joi.string().regex(/^(1|-1)$/i),
        published: Joi.string().regex(/^(1|0|all)$/i),
        skip: Joi.number().min(0),
        limit: Joi.number().min(1).max(20)
    });
    const { error } = Joi.validate(query, schema);
    return error;
};

module.exports = {
    validatePost,
    validateSetPublished,
    validateDeleteMedia,
    validateGetMedia,
    validateGetPosts,
    validateGetPost,
    validateEditPost,
    validateSearchSuggestions,
    validateSearch
};
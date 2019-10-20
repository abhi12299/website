const Joi = require('joi');

function validatePost({title, headerImageURL, 
    metaDescription, postedDate = Date.now(), body, published = 0}) {
    const postSchema = Joi.object({
        title: Joi.string().required(),
        headerImageURL: Joi.string().required(),
        metaDescription: Joi.string().required(),
        postedDate: Joi.number().required(),
        body: Joi.string().required(),
        published: Joi.number().allow(0, 1).required()
    });

    const { error } = Joi.validate({
        title, headerImageURL, metaDescription, postedDate, body, published
    }, postSchema);
    return error;
}

module.exports = {
    validatePost
};
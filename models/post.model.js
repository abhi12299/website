const mongoose = require('mongoose');
const logger = require('../logger');
const elasticSearchHelper = require('../elasticClient/helper');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    _id: {
        type: String
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    headerImageURL: {
        type: String,
        required: true
    },
    metaDescription: {
        type: String,
        required: true
    },
    metaKeywords: {
        type: [String],
        required: true
    },
    postedDate: {
        type: Number,
        required: true,
        default: Date.now(),
        index: true
    },
    body: {
        type: String,
        required: true
    },
    published: {
        type: Number,
        default: 0,
    },
    // media attached to the post hosted on the same server
    // includes images and videos
    media: {
        type: [String],
        default: []
    }
}, { timestamps: true });

PostSchema.statics = {
    async savePost(postObj) {
        try {
            const post =  new this(postObj);
            return await post.save();
        } catch (err) {
            logger.error('Cannot create post', err);
            return null;
        }
    },
    async publishPost(postId) {
        try {
            return await this.findOneAndUpdate({ _id: postId }, {
                $set: {
                    published: 1
                }
            }, { new: true });
        } catch (err) {
            logger.error('Cannot publish post', err);
            return null;
        }
    },
    async unpublishPost(postId) {
        try {
            return await this.findOneAndUpdate({ _id: postId }, {
                $set: {
                    published: 0
                }
            }, { new: true });
        } catch (err) {
            logger.error('Cannot unpublish post', err);
            return null;
        }
    },
    async updatePost(postId, updates) {
        try {
            return await this.findOneAndUpdate({ _id: postId }, {
                $set: {
                    ...updates
                }
            }, { new: true });
        } catch (err) {
            logger.error('Cannot update post', err);
            return null;
        }
    },
    async getPosts({ published, sortBy='postedDate', sortOrder=-1, skip=0, limit=5 }) {
        try {
            let aggrQuery = [];
            let countQuery = {};
            if (published !== 'all' && typeof published !== 'undefined') {
                published = parseInt(published);
                aggrQuery.push({
                    $match: { published }
                });
                countQuery.published = published;
            }
            if (typeof sortBy !== 'undefined') {
                aggrQuery.push({
                    $sort: {
                        [sortBy]: sortOrder
                    }
                });
            }
    
            aggrQuery = [
                ...aggrQuery, 
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
                {
                    $project: {
                        _id: 1, title: 1, headerImageURL: 1,
                        published: 1, postedDate: 1,
                        metaKeywords: 1, metaDescription: 1
                    }
                }
            ];
            const count = await this.countDocuments(countQuery);
            const posts = await this.aggregate(aggrQuery);
            return { posts, count };
        } catch (err) {
            logger.error('Cannot get posts', err);
            return null;
        }
    },
    async getPost(_id) {
        try {
            return await this.findOne({ _id }, '_id title headerImageURL metaDescription metaKeywords postedDate body');
        } catch (error) {
            logger.error('Cannot get post', error);
            return null;
        }
    },
    async setPublished(_id, published) {
        return await this.findOneAndUpdate({ _id }, { $set: {published} }, { new: true });
    },
    async getSuggestions({ q, sortBy, sortOrder, published }) {
        try {
            published = parseInt(published);
            if (isNaN(published)) {
                published = undefined;
            }

            sortOrder = parseInt(sortOrder) || -1;

            const { data, error } = await elasticSearchHelper.suggestions({ q, sortBy, sortOrder, published });
            if (error) {
                return { data: [], error: true };
            }

            let aggrQuery = [
                {$match: {
                    _id: {
                        $in: data.map(d => d._id)
                    }
                }},
                {$sort: {
                    [sortBy]: sortOrder
                }},
                {$project: {
                    _id: 1, title: 1, published: 1
                }}
            ];
            const posts = await this.aggregate(aggrQuery);

            return { 
                data: posts.map(p => {
                        const postData = data.filter(d => d._id === p._id)[0] || {};
                        return {
                            ...p,
                            body: postData.body || ''
                        };
                    }), 
                error: false 
            };
        } catch (error) {
            return { data: [], error: true };
        }
    },
    async getSearchResults({ q, sortBy, sortOrder, published, skip, limit }) {
        try {
            published = parseInt(published);
            if (isNaN(published)) {
                published = undefined;
            }

            sortOrder = parseInt(sortOrder) || -1;

            const { data, error, count } = await elasticSearchHelper.suggestions({ q, sortBy, sortOrder, published });
            if (error) {
                return { data: [], error: true, count: 0 };
            }

            let aggrQuery = [
                {$match: {
                    _id: {
                        $in: data.map(d => d._id)
                    }
                }},
                {$sort: {
                    [sortBy]: sortOrder
                }},
                {$skip: skip},
                {$limit: limit},
                {$project: {
                    _id: 1, title: 1, headerImageURL: 1,
                    published: 1, postedDate: 1,
                    metaKeywords: 1, metaDescription: 1
                }}
            ];
            const posts = await this.aggregate(aggrQuery);

            return { 
                data: posts,
                error: false,
                count
            };
        } catch (error) {
            return { data: [], error: true, count: 0 };
        }
    }
};

const Post = mongoose.model('post', PostSchema);

module.exports = Post;

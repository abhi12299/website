const mongoose = require('mongoose');
const logger = require('../logger');

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
    }
};

const Post = mongoose.model('post', PostSchema);

module.exports = Post;

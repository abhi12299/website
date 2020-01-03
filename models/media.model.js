const mongoose = require('mongoose');
const logger = require('../logger');
const baseURL = require('../constants/apiURL');

const Schema = mongoose.Schema;
const MediaSchema = new Schema({
    _id: {
        type: String
    },
    // how many posts use this media
    usedInPosts: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

MediaSchema.statics = {
    async saveMedia(mediaObj) {
        try {
            const m =  new this(mediaObj);
            return await m.save();
        } catch (err) {
            logger.error('Cannot create media', err);
            return null;
        }
    },
    async deleteMedia(mediaName) {
        try {
            const media = await this.findOne({ _id: mediaName });
            await this.deleteOne({ _id: mediaName });
            return media;
        } catch (err) {
            logger.error('Cannot delete media', err);
            return null;
        }
    },
    async getMedia({ sortBy='createdAt', sortOrder=-1, skip=0, limit=20 }) {
        try {
            let aggrQuery = [];
            let countQuery = {};
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
                    $addFields: {
                        url: {
                            $concat: [baseURL, '/static/blogs/', '$_id']
                        },
                        type: {
                            $cond: {
                                if: {
                                    $regexMatch: { input: '$_id' , regex: /\.(png|jpe?g|gif)$/i }
                                },
                                then: 'image',
                                else: 'video'
                            }
                        }
                    }
                },
                {
                    $project: {
                        updatedAt: 0,
                        __v: 0
                    }
                }
            ];
            const count = await this.countDocuments(countQuery);
            const media = await this.aggregate(aggrQuery);
            return { media, count };
        } catch (err) {
            logger.error('Cannot get media', err);
            return null;
        }
    },
    async updateMedias(ids, updateObj) {
        await this.updateMany({
            _id: {
                $in: ids
            }
        }, updateObj);
    }
};

const Media = mongoose.model('media', MediaSchema);

module.exports = Media;

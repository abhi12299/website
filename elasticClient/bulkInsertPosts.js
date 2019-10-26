const striptags = require('striptags');

const client = require('./index');
const Post = require('../models/post.model');
const logger = require('../logger');

async function bulkInsertPosts() {
    try {
        const postsCount = await Post.countDocuments();
        const batchSize = 20;
        const totalBatches = Math.ceil(postsCount / batchSize);
        const batchArr = Array.apply(null, Array(totalBatches)).map((x, i) => i);
        const posts = [];
    
        for (let batch of batchArr) {
            let skip = batch * batchSize;
            const postBatch = await Post.aggregate([
                {
                    $match: { }
                },
                {
                    $skip: skip
                },
                {
                    $limit: batchSize
                },
                {
                    $project: {
                        id: '$_id',
                        title: 1,
                        postedDate: 1,
                        body: 1,
                        published: 1,
                        _id: 0
                    }
                }
            ]);
            for (const post of postBatch) {
                posts.push({
                    index: {
                        _index: 'post',
                    }
                });
                posts.push({ ...post, body: striptags(post.body) });
            }
        }
        const resp = await client.bulk({
            body: posts
        });
        if (resp.error) {
            logger.error('Error while inserting posts', resp);
            return { error: resp.error };
        }

        logger.info('from elastic client, resp is', resp);
        return { postCount: postsCount };
    } catch (err) {
        logger.error('Error while bulk inserting posts:', err);
        return { error: err };
    }
}

module.exports = bulkInsertPosts;

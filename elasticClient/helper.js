const client = require('./index');
const logger = require('../logger');

async function addPost(doc) {
    try {
        const resp = await client.index({
            id: doc.id,
            index: 'post',
            body: {
                id: doc.id,
                title: doc.title,
                body: doc.body,
                published: doc.published,
                postedDate: doc.postedDate
            }
        });
        logger.info('add post, elastic resp is', resp);
        return { error: false };
    } catch (error) {
        logger.error('Error adding post to elastic search!', error);
        return { error: true };
    }
}

async function updatePost(_id, updates) {
    try {
        const script = {
            inline: ''
        };
        for (const key of Object.keys(updates)) {
            script.inline += `ctx._source.${key} = `;
            if (typeof updates[key] === 'string') {
                script.inline += `'${updates[key]}';`;
            } else {
                script.inline += `${updates[key]}; `;
            }
        }
        const resp = await client.updateByQuery({
            index: 'post',
            type: '_doc',
            body: {
                query: {
                    match: {
                        id: _id
                    }
                },
                script
            }
        });
        logger.info('update post, elastic resp is', resp);
        return { error: false };
    } catch (error) {
        logger.error('Error updating post in elastic search!', error);
        return { error: true };
    }
}

async function deletePost(_id) {
    try {
        const resp = await client.deleteByQuery({
            index: 'post',
            type: '_doc',
            body: {
                query: {
                    match: { id: _id }
                }
            }
        });
        logger.info('Delete post, elastic resp is', resp);
        return { error: false };
    } catch (error) {
        logger.error('Error deleting post from elastic search', error);
        return { error: true };
    }
}

module.exports = {
    addPost,
    updatePost,
    deletePost
};

const client = require('./index');
const logger = require('../logger');

async function addPost(doc) {
    try {
        const resp = await client.index({
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

module.exports = {
    addPost
};

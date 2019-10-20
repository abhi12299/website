const client = require('./index');
const logger = require('../logger');

async function addPost(doc) {
    try {
        const resp = await client.index({
            index: 'post',
            id: doc._id,
            type: 'article',
            body: doc.body
        });
        console.log('from elastic resp is', resp);
        return { error: false };
    } catch (error) {
        logger.error('Error adding post to elastic search!', error);
        return { error: true };
    }
}

module.exports = {
    addPost
};

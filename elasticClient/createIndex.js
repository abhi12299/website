const client = require('./index');
const logger = require('../logger');

async function createIndex() {
    try {
        if (await client.indices.exists({ index: 'post'})) {
            await client.indices.delete({ index: 'post' });
        }

        await client.indices.create({
            index: 'post',
        });
        const schema = {
            title: { type: 'text' },
            body: { type: 'text' },
            published: { type: 'byte' },
            postedDate: { type: 'date' },
            id: { type: 'keyword' }
        };
        await client.indices.putMapping({
            index: 'post',
            body: { properties: schema } 
        });
    } catch (err) {
        logger.error('Error while creating index!', err);
        return err;
    }
}

module.exports = createIndex;

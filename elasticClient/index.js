const elasticSearch = require('elasticsearch');

const elasticClient = new elasticSearch.Client({
    hosts: [process.env.ELASTIC_URL]
});

module.exports = elasticClient;

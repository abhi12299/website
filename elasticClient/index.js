const elasticSearch = require('elasticsearch');

const elasticClient = new elasticSearch.Client({
    hosts: [process.env.ELASTIC_URL],
    log: 'info'
});

module.exports = elasticClient;

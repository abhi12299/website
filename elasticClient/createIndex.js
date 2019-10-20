const client = require('./index');

client.indices.create({
    index: 'post',
}, (err, resp, status) => {
    console.log('creating index named post', { err, resp, status });
});

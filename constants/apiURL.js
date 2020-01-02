let baseURL = 'http://localhost:3001';

console.log('env is', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    console.log('we in prod build');
}

module.exports = baseURL;

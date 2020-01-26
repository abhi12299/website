let baseURL = 'http://localhost:3001';

if (process.env.NODE_ENV === 'production') {
    baseURL = 'https://iabhishek.dev';
}

module.exports = baseURL;

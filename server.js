require('./config');

const express = require('express');
const next = require('next');
const path = require('path');

const logger = require('./logger');
const serverMiddleware = require('./server-middleware');
const subscriberController = require('./controllers/subscribe.controller');

// mongodb
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    autoIndex: false 
});
const db = mongoose.connection;
db.once('error', err => {
    logger.error('MongoDB connect error', err);
    process.exit(1);
});

db.once('open', () => {
    logger.info('MongoDB connected!');
});

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    serverMiddleware(server);

    server.post('/api/subscribe', subscriberController);

    server.get('/service-worker.js', (req, res) => {
        res.sendFile(path.join(__dirname, '.next', 'service-worker.js'));
    });

    server.all('*', (req, res) => {
        res.cookie('csrfToken', req.csrfToken ? req.csrfToken() : null, {
            sameSite: true,
            httpOnly: true
        });

        if (req.path.startsWith('/workbox')) {
            return res.sendFile(path.join(__dirname, '.next', req.path));
        }
        
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});

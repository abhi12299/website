require('./config');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const express = require('express');
const next = require('next');
const path = require('path');
const mongoose = require('mongoose');

const logger = require('./logger');
const serverMiddleware = require('./server-middleware');
const subscriberController = require('./controllers/subscribe.controller');

if (cluster.isMaster) {
    masterProcess();
} else {
    childProcess();
}

function masterProcess() {
    logger.info(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        logger.info(`Forking process number ${i}...`);
        cluster.fork();
    }

    cluster.on('exit', worker => {
        logger.info(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
}

function childProcess() {
    // mongodb
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
}

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled promise rejection:', reason + ':' + JSON.stringify(promise, null, 2));
});

process.on('uncaughtException', err => {
    logger.error('Uncaught exception:', err);
});

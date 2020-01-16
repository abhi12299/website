require('./config');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const express = require('express');
const next = require('next');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const fs = require('fs');

const logger = require('./logger');
const serverMiddleware = require('./server-middleware');
const auth = require('./auth');
const apiRouter = require('./routes/apiRouter');
const authRouter = require('./routes/authRouter');
const errorCodes = require('./constants/errorCodes');

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
        autoIndex: false,
        useFindAndModify: false
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

        auth(passport);

        // api routes
        server.use(passport.initialize());
        server.use('/api', apiRouter);
        server.use('/auth', authRouter);

        // static assets
        server.get('/static/blogs/:assetPath', (req, res) => {
            const filePath = path.join(__dirname, './public', req.path);
            if (fs.existsSync(filePath)) {
                return res.sendFile(path.join(__dirname, './public', req.path));
            } else {
                res.status(404).send('File not found!');
            }
        });

        // service worker
        server.get('/service-worker.js', (req, res) => {
            res.sendFile(path.join(__dirname, '.next', 'service-worker.js'));
        });

        server.all('*', (req, res) => {
            res.cookie('csrfToken', req.csrfToken ? req.csrfToken() : null, {
                sameSite: true,
                httpOnly: true
            });

            if (req.path.startsWith('/workbox')) {
                const filePath = path.join(__dirname, '.next', req.path)
                if (fs.existsSync(filePath)) {
                    return res.sendFile(path.join(__dirname, '.next', req.path));
                }
                return res.status(404).end();
            }

            return handle(req, res);
        });

        server.use((err, req, res, next) => {
            if (err.code === errorCodes[4]) {
                logger.error('CSRF token mismatch', err);
                return res.status(403).json({ error: true, msg: 'Something went wrong. Please refresh the page and try again.'});
            } else if (err.code === errorCodes[3]) {
                return res.status(429).json({ error: true, msg: 'We\'ve been receiving a lot of requests from you. Please try after sometime.' });
            } else if (err.code === errorCodes[0]) {
                req.logout && req.logout();
                res.cookie('notAdmin', 'notAdmin');
                return res.redirect('/');
                // return res.redirect('https://accounts.google.com/logout');
            }
            return next(err);
        });

        server.listen(port, err => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    });
}

process.on('unhandledRejection', reason => {
    logger.error('Unhandled promise rejection:', reason);
});

process.on('uncaughtException', err => {
    logger.error('Uncaught exception:', err);
});

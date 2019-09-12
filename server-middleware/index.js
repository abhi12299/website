const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

module.exports = server => {
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(cookieParser());
    server.use(compression());
    server.use(csrf({
        cookie: true,
        value: req => req.cookies.csrfToken
    }));

    server.use(function (err, req, res, next) {
        if (err.code !== 'EBADCSRFTOKEN') return next(err);

        logger.error('CSRF token mismatch', err);
        res.status(403);
    });
};

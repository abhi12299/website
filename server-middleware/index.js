const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const csrfProtection = csrf({
    cookie: true,
    value: req => req.cookies.csrfToken
});

module.exports = server => {
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(cookieParser());
    server.use(compression());
    server.use((req, res, next) => {
        if (req.path.startsWith('/auth') || req.path.startsWith('/api/dashboard')) {
            return next();
        }

        return csrfProtection(req, res, next);
    });
};

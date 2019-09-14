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
};

const Router = require('express').Router;

const rateLimiter = require('../utils/rateLimiter');
const ensureAdmin = require('../server-middleware/ensureAdmin');
const searchController = require('../controllers/search.controller');
const subscriberController = require('../controllers/subscribe.controller');
const dashboardController = require('../controllers/dashboard.controller');
const postController = require('../controllers/post.controller');

const apiRouter = Router();

apiRouter.post('/subscribe', rateLimiter, subscriberController);

apiRouter.use('/search', ensureAdmin(false), searchController);

apiRouter.use('/post', ensureAdmin(false), postController);

// dashboard api routes
apiRouter.use('/dashboard', ensureAdmin(), dashboardController);

module.exports = apiRouter;

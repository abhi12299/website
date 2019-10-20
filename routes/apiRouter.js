const Router = require('express').Router;

const rateLimiter = require('../utils/rateLimiter');
const ensureAdmin = require('../server-middleware/ensureAdmin');
const subscriberController = require('../controllers/subscribe.controller');
const dashboardController = require('../controllers/dashboard.controller');

const apiRouter = Router();

apiRouter.post('/subscribe', rateLimiter, subscriberController);

// dashboard api routes
apiRouter.use('/dashboard', ensureAdmin, dashboardController);

module.exports = apiRouter;

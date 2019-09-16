const Router = require('express').Router;

const rateLimiter = require('../utils/rateLimiter');
const subscriberController = require('../controllers/subscribe.controller');

const apiRouter = Router();

apiRouter.post('/subscribe', rateLimiter, subscriberController);

module.exports = apiRouter;

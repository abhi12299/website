const Router = require('express').Router;
const passport = require('passport');
const jwt = require('jsonwebtoken');

const logger = require('../logger');
const Session = require('../models/session.model');
const verifyUserToken = require('../utils/verifyUserToken');

const authRouter = Router();

authRouter.get('/login', async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        const { valid } = await verifyUserToken(token);
        if (valid) {
            return res.redirect('/dashboard');
        }
    }
    next();
}, passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.email']
}));

authRouter.get('/redirect', passport.authenticate('google', {
    failureRedirect: '/'
}), async (req, res) => {
    const sessionId = await Session.createUserSession(req.user.email);
    const token = jwt.sign({
        token: req.user.token,
        sessionId
    }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');
});

authRouter.get('/logout', async (req, res) => {
    try {
        const { token } = req.cookies;
        if (token) {
            await req.logout();
            res.clearCookie('token');
            res.cookie('loggedOut', 'true');

            const { sessionId } = await jwt.verify(token, process.env.JWT_SECRET);
            await Session.destroyUserSession(sessionId);

            res.redirect('/');
            return;
        }
    } catch (err) {}
    res.redirect('/');
});

authRouter.get('/verify', async (req, res) => {
    try {
        let { token } = req.cookies;
        
        const bearer = req.headers['authorization'];
        if (bearer && !token) {
            token = bearer.split(' ')[1];
        }

        if (!token) {
            const err = new Error();
            err.code = 'TOKENNOTFOUND';
            throw err;
        }
        
        const { valid } = await verifyUserToken(token);
        if (!valid) {
            const err = new Error();
            err.code = 'TOKENINVALID';
            throw err;
        }

        return res.json({ valid: true });
    } catch(err) {
        logger.error('User verification failed with error:', err);
        return res.json({ valid: false });
    }
});

module.exports = authRouter;

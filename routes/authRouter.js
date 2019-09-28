const Router = require('express').Router;
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Session = require('../models/session.model');
const verifyUserToken = require('../utils/verifyUserToken');
const emailHelperFunction = require('../utils/emailHelper');

const authRouter = Router();

authRouter.get('/login', async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        const { valid, error } = await verifyUserToken(token);
        if (valid) {
            return res.redirect('/dashboard');
        } else {
            // send email to admins
            emailHelperFunction(error.code, error.data, req);
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
        token: req.user._id,
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

            const { sessionId } = jwt.decode(token, process.env.JWT_SECRET);
            await Session.destroyUserSession(sessionId);

            res.redirect('/');
            return;
        }
    } catch (err) { }
    res.redirect('/');
});

authRouter.get('/verify', async (req, res) => {
    let { token } = req.cookies;

    const bearer = req.headers['authorization'];
    if (bearer && !token) {
        token = bearer.split(' ')[1];
    }

    if (token) {
        const { valid, error } = await verifyUserToken(token);
        if (valid) {
            return res.json({ valid: true });
        } else {
            // send email to admins
            emailHelperFunction(error.code, error.data, req);
        }
    }
    return res.json({ valid: false });
});

module.exports = authRouter;

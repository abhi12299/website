const Router = require('express').Router;
const passport = require('passport');
const jwt = require('jsonwebtoken');

const verifyUserToken = require('../utils/verifyUserToken');

const authRouter = Router();

authRouter.get('/login', async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        const valid = await verifyUserToken(token);
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
}), (req, res) => {
    const token = jwt.sign(req.user.token, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');
});

authRouter.get('/logout', async (req, res) => {
    if ('token' in req.cookies) {
        await req.logout();
        res.clearCookie('token');
        res.cookie('loggedOut', 'true');
        res.redirect('/');
        return;
    }
    res.redirect('/');
});

authRouter.get('/verify', async (req, res) => {
    let { token } = req.cookies;
    const bearer = req.headers['authorization'];
    if (bearer) {
        token = bearer.split(' ')[1];
    }
    console.log('token is:', token);
    if (token) {
        const valid = await verifyUserToken(token);
        return res.json({ valid });
    }
    return res.json({ valid: false });
});

module.exports = authRouter;

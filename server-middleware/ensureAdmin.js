const verifyAdminToken = require('../utils/verifyAdminToken');
const emailHelper = require('../utils/emailHelper');

module.exports = (throwError=true) => async (req, res, next) => {
    let { token } = req.cookies;

    const bearer = req.headers['authorization'];
    if (bearer && !token) {
        token = bearer.split(' ')[1];
    }
    if (!token) {
        token = req.body ? req.body.token : null;
    }

    if (!token) {
        if (throwError) {
            return res.status(401).json({ error: true, msg: 'You are not authorized!' });
        }
        next();
    } else {
        const { valid, error, admin } = await verifyAdminToken(token);
        if (!valid) {
            await emailHelper(error.code, error.data, req);
            if (throwError) {
                return res.status(401).json({ error: true, msg: 'Invalid user token!' });
            }
            next();
        } else {
            req.admin = admin;
            next();
        }
    }
};

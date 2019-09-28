const jwt = require('jsonwebtoken');

const logger = require('../logger');
const Admin = require('../models/admin.model');
const Session = require('../models/session.model');
const errorCodes = require('../constants/errorCodes');

module.exports = async jwtToken => {
    try {
        const { token, sessionId } = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const admin = await Admin.findOne({ _id: token });
        if (!admin) {
            const err = new Error();
            err.code = errorCodes[0];
            err.data = {
                _id: token,
                sessionId
            };
            throw err;
        }
        const { sessionValid, error } = await Session.verifyUserSession(admin.email, sessionId);

        if (!sessionValid) {
            const err = new Error();
            err.code = error.code;
            err.data = error.data;
            throw err;
        }
        return { valid: true };
    } catch (error) {
        logger.error('JWT verification error: ', error);
        return { valid: false, error: {
            code: error.code, data: error.data
        }};
    }
}
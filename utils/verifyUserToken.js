const jwt = require('jsonwebtoken');

const logger = require('../logger');
const Admin = require('../models/admin.model');
const Session = require('../models/session.model');

module.exports = async jwtToken => {
    try {
        const { token, sessionId } = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const admin = await Admin.findOne({ token });
        if (!admin) {
            throw new Error();
        }
        const { sessionValid } = await Session.verifyUserSession(admin.email, sessionId);

        if (!sessionValid) {
            throw new Error('session invalid');
        }
        return { valid: true };
    } catch (error) {
        logger.error('JWT verification error', error);
        return { valid: false };
    }
}
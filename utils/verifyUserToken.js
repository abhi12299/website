const jwt = require('jsonwebtoken');

const Admin = require('../models/admin.model');

module.exports = async token => {
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findOne({ token: decodedToken });
        if (!admin) {
            throw new Error();
        }
        return true;
    } catch (error) {
        logger.error('JWT verification error', error);
        return false;
    }
}
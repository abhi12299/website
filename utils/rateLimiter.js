const logger = require('../logger');
const redisClient = require('../config/redisDb');

module.exports = async (req, res, next) => {
    try {
        const THROTTLE_TIME = 30 * 60; // 30 mins
        const MAX_ATTEMPTS = 5; // max attempts per IP in a given time
        const IP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        logger.info('IP address is: ' + IP);

        // gives null on non-existent key
        const numAttempts = Number(await redisClient.getAsync(IP));
        if (numAttempts < MAX_ATTEMPTS) {
            logger.info(`${IP} has attempts ${numAttempts}..`);
            let TTL = await redisClient.ttlAsync(IP);
            if (TTL <= 0) {
                TTL = THROTTLE_TIME;
            }

            await redisClient.setexAsync(IP, TTL, numAttempts + 1);
        } else {
            logger.info(`throttling on IP: ${IP}`);
            const err = new Error();
            err.code = 'THROTTLE';
            throw err;
        }

        next();
    } catch (err) {
        next(err);
    }
}

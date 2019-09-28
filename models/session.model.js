const uuid = require('uuid/v4');
const mongoose = require('mongoose');

const errorCodes = require('../constants/errorCodes');
const logger = require('../logger');

const Schema = mongoose.Schema;
const SessionSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    identifier: {
        type: String,
        required: true,
        unique: true
    },
    validity: {
        type: Number,
        required: true
    }
});

SessionSchema.statics = {
    async verifyUserSession(email, identifier) {
        try {
            const FIVE_MINS_IN_MS = 1000 * 60 * 5;
            const TEN_MINS_IN_MS = 2 * FIVE_MINS_IN_MS;
            const session = await this.findOne({ email, identifier });
    
            if (!session) {
                const err = new Error();
                err.code = errorCodes[1];
                err.data = {
                    email,
                    sessionId: identifier
                };
                throw err;
            }
            
            if (session.validity < Date.now()) {
                const err = new Error();
                err.code = errorCodes[2];
                err.data = {
                    email,
                    sessionId: identifier
                };
                await this.deleteOne({ _id: session._id });
                throw err;
            }
            // update session validity by 10mins 
            // if validity is less than 5mins
            if (session.validity - Date.now() <= FIVE_MINS_IN_MS) {
                const newSession = await this.findOneAndUpdate({ _id: session._id }, {
                    validity: session.validity + TEN_MINS_IN_MS
                });
                logger.info('Updating user session by 10mins:' + newSession);
            }
            return { sessionValid: true };
        } catch (err) {
            logger.error('Verify user session failed with error:', err);
            return { sessionValid: false, error: {
                code: err.code, data: err.data
            }};
        }
    },
    async createUserSession(email) {
        try {
            // remove previous sessions with that email
            await this.deleteMany({ email });
            
            // create new session with 1hr validity
            const date = new Date();
            date.setHours(date.getHours() + 1);
            const session = {
                email,
                identifier: uuid().toString(),
                validity: date.getTime()
            };

            await new this(session).save();

            return session.identifier;
        } catch (err) {
            logger.error('Session cannot be created:', err);
            return null;
        }
    },
    async destroyUserSession(identifier) {
        await this.deleteOne({ identifier });
    }
};

const Session = mongoose.model('session', SessionSchema);

module.exports = Session;

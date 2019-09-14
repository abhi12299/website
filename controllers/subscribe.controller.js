const Subscriber = require('../models/subscriber.model');
const logger = require('../logger');
const stripRequest = require('../logger/stripRequest');

module.exports = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        logger.info('No email provided', stripRequest(req));
        return res.status(400).json({ msg: 'Please provide an email.', error: true });
    }

    try {
        await Subscriber.create({ email });
        res.json('ok');
    } catch (err) {
        logger.error('Subscriber cannot be created:', err, stripRequest(req));
        if (err.message.startsWith('E11000')) {
            // duplicate key error
           return res.status(400).json({ msg: 'You are already subscribed.', error: true });
        } else {
           return res.status(400).json({ msg: 'Something went wrong! Please try later.', error: true });
        }
    }
}
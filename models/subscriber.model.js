const mongoose = require('mongoose');
const logger = require('../logger');

const Schema = mongoose.Schema;
const SubscriberSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, { timestamps: true });

SubscriberSchema.on('index', err => {
    if (err) {
        logger.error('Index cannot be created on subscriber model', err);
    } else {
        console.log('index created!');
    }
});

const Subscriber = mongoose.model('subscriber', SubscriberSchema);

module.exports = Subscriber;

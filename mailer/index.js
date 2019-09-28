const nodemailer = require('nodemailer');

const logger = require('../logger');
const Admin = require('../models/admin.model');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

async function sendEmailToAdmins(subject, body) {
    let to = '';
    
    const admins = await Admin.find({});

    for (let admin of admins) {
        to += `${admin.email},`;
    }

    to = to.slice(0, -1);

    const mailOpts = {
        from: process.env.GMAIL_USER,
        subject,
        html: body,
        to
    };
    transporter.sendMail(mailOpts, (err, info) => {
        if (err) {
            logger.error('Admin email send failed with error:', err);
        } else {
            logger.info('Admin email send info:', info);
        }
    });
}

module.exports = {
    sendEmailToAdmins
};

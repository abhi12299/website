const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Admin = require('./models/admin.model');
const logger = require('./logger');

module.exports = (passport) => {
    const { OAUTH_CLIENT_ID, CLIENT_SECRET } = process.env;

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
            clientID: OAUTH_CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: '/auth/redirect'
        },
        async (token, refreshToken, profile, done) => {
            let email;
            if (profile.emails && profile.emails.length) {
                email = profile.emails[0].value;
            }

            try {
                if (!email) {
                    throw new Error();
                }
                const admin = await Admin.findOne({ email });
                if (!admin) {
                    throw new Error();
                }

                if (admin.token !== token) {
                    await Admin.updateOne({ _id: admin._id }, {
                        $set: { token }
                    });
                }
                return done(null, { token });
            } catch (error) {
                logger.error(`Admin access denied, email was: ${email}`, error);
                const err = new Error();
                err.code = 'NOTADMIN';
                return done(err, null);
            }
        }));
};

require('dotenv').config();
const logger = require('../logger');

const Joi = require('joi');

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(['development', 'production', 'test', 'provision'])
        .default('development'),
    MONGO_URI: Joi.string().required()
}).unknown().required();

const { error } = Joi.validate(process.env, envVarsSchema);
if (error) {
    logger.error('Env vars validation fail', error);
    throw new Error(`Env vars validation error: ${error.message}`);
}

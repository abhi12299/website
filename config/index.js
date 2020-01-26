require('dotenv').config();
const logger = require('../logger');

const Joi = require('joi');

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(['development', 'production', 'test', 'provision'])
        .default('development'),
    MONGO_URI: Joi.string().required(),
    REDIS_HOST: Joi.string().default('127.0.0.1'),
    REDIS_PORT: Joi.number().default(6379),
    OAUTH_CLIENT_ID: Joi.string().required(),
    CLIENT_SECRET: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    GMAIL_USER: Joi.string().required(),
    GMAIL_PASS: Joi.string().required(),
    ELASTIC_URL: Joi.string().required(),
    REDIS_PASSWORD: Joi.when('NODE_ENV', { is: 'production', then: Joi.string().trim().required() })
}).unknown().required();

const { error } = Joi.validate(process.env, envVarsSchema);
if (error) {
    logger.error('Env vars validation fail', error);
    throw new Error(`Env vars validation error: ${error.message}`);
}

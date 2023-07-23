import * as joi from 'joi';

export const envSchemaValidation = joi.object({
  PORT: joi.number().required().default(3000),
  NODE_DEV: joi.string().required().default('dev'),
  DB_HOST: joi.string().required(),
  DB_USER: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_NAME: joi.string().required(),
  DB_PORT: joi.number().required(),
  DB_AUTOLOAD: joi.boolean().required(),
  DB_SYNCRO: joi.boolean().required(),
  DB_SCHEMA: joi.string().required(),
  TTL_TIME: joi.number().default(60).required(),
  TTL_LIMIT: joi.number().default(10).required(),
  HASH_LENGTH: joi.number().default(6).required(),
  APP_HOST: joi.string().required(),
  SWAGGER_VERSION: joi.string().required(),
  RECAPTCHA_TOKEN_SERVICE: joi.string().required(),
  RECAPTCHA_URL_VERIFY: joi.string().required(),
});

import dotenv from 'dotenv'
import Joi from 'joi'
import path from 'path'

dotenv.config({ path: path.join(__dirname, `../../.env`) })

const envVarsScheme = Joi.object()
  .keys({
    APP_NAME: Joi.string().description('App name'),
    APP_ENV: Joi.string().valid('production', 'development').required(),
    APP_HOST: Joi.string().default('localhost').required().description('App host'),
    APP_PORT: Joi.number().default(5000).description('Server port'),

    MONGO_URI: Joi.string().required().description('Mongo DB URI'),
    MONGO_LOG: Joi.bool().default(false).description('Mongo DB query log'),

    REDIS_USERNAME: Joi.string().description('Redis username').allow('', null),
    REDIS_PASSWORD: Joi.string().description('Redis password').allow('', null),
    REDIS_HOST: Joi.string().description('Redis host'),
    REDIS_PORT: Joi.string().default(6379).description('Redis port'),

    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
  })
  .unknown()

const { value: envVars, error } = envVarsScheme.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  app: {
    name: envVars.APP_NAME,
    environment: envVars.APP_ENV,
    host: envVars.APP_HOST,
    port: envVars.APP_PORT,
  },
  mongoose: {
    uri: envVars.MONGO_URI,
    log: envVars.MONGO_LOG,
  },
  redis: {
    username: envVars.REDIS_USERNAME,
    password: envVars.REDIS_PASSWORD,
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
}

export default config

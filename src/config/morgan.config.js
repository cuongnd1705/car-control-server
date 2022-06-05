import morgan from 'morgan'
import env from './env.config'
import logger from './logger.config'

morgan.token('message', (req, res) => res.locals.errorMessage || '')

const getIpFormat = () => (env.app.environment === 'production' ? ':remote-addr - ' : '')

const successResponseFormat = `":remote-addr - ${getIpFormat()}:method :url" :status :res[content-length] - ":user-agent" - :response-time ms`
const errorResponseFormat = `":remote-addr - ${getIpFormat()}:method :url" :status :res[content-length] - ":user-agent" - :response-time ms - message: :message`

export const morganSuccess = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.http(message.trim()) },
})

export const morganError = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
})

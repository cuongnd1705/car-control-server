import { createServer } from 'http'
import app from './app'
import env from './config/env.config'
import logger from './config/logger.config'
import './config/mongoose.config'
import './services/socket.service'

const normalizePort = (val) => {
  const port = parseInt(val, 10)

  if (Number.isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

const port = normalizePort(env.app.port)

app.set('port', port)

const server = createServer(app)

server.listen(port)

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges.`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use.`)
      process.exit(1)
      break
    default:
      throw error
  }
}

const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`

  logger.info(`Server listening on ${bind}.`)
}

server.on('error', onError)
server.on('listening', onListening)

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error) => {
  logger.error(error.message)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (server) {
    server.close()
  }
})

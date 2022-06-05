import path from 'path'
import winston from 'winston'
import 'winston-daily-rotate-file'
import env from './env.config'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const getLevel = () => {
  const environment = env.app.environment || 'development'
  const isDevelopment = environment === 'development'
  return isDevelopment ? 'debug' : 'info'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.align(),
  winston.format.printf((info) => {
    const { timestamp, level, message, stack } = info
    if (stack) return `[${timestamp}] [${level}]: ${stack}`
    return `[${timestamp}] [${level}]: ${message}`
  })
)

const transports = [
  new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
  }),
  new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, `../../logs/%DATE%/error.log`),
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
    level: 'error',
    auditFile: path.join(__dirname, `../../logs/audit/error-audit.json`),
    zippedArchive: true,
    format: winston.format.uncolorize(),
    handleExceptions: true,
    json: true,
  }),
  new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, `../../logs/%DATE%/combined.log`),
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
    auditFile: path.join(__dirname, `../../logs/audit/combined-audit.json`),
    zippedArchive: true,
    format: winston.format.uncolorize(),
    json: true,
  }),
]

const logger = winston.createLogger({
  level: getLevel(),
  levels,
  format,
  transports,
})

export default logger

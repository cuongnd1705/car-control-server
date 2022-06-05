import Mongoose from 'mongoose'
import env from '../config/env.config'
import logger from '../config/logger.config'
import { httpStatus } from '../constants'
import { ApiError, NotFoundError } from '../errors'

export const invalidApiHandler = (req, res, next) => {
  const { method, path } = req

  next(new NotFoundError(`Request ${method} ${path} not found`))
}

export const errorConverter = (err, req, res, next) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode =
      err.statusCode || error instanceof Mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR
    const message = err.message || httpStatus[statusCode]
    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}

export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err
  if (env.app.environment === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
  }

  res.locals.errorMessage = err.message

  if (env.app.environment === 'development') {
    logger.error(err.stack)
  }

  return res.errorResponse(statusCode, message, err.stack)
}

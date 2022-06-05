import env from '../config/env.config'

const customResponse = (req, res, next) => {
  res.successResponse = (statusCode, message, data) => {
    return res.status(statusCode).json({
      status: statusCode,
      message,
      data,
    })
  }

  res.errorResponse = (statusCode, message, data) => {
    return res.status(statusCode).json({
      status: statusCode,
      message,
      ...(env.app.environment === 'development' && { errors: data }),
    })
  }

  next()
}

export default customResponse

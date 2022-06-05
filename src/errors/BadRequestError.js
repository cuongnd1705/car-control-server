import { httpStatus } from '../constants'
import ApiError from './ApiError'

class BadRequestError extends ApiError {
  constructor(message, stack) {
    super(httpStatus.BAD_REQUEST, message || httpStatus[httpStatus.BAD_REQUEST], false, stack)
  }
}

export default BadRequestError

import { httpStatus } from '../constants'
import ApiError from './ApiError'

class UnauthorizedError extends ApiError {
  constructor(message, stack) {
    super(httpStatus.UNAUTHORIZED, message || httpStatus[httpStatus.UNAUTHORIZED], false, stack)
  }
}

export default UnauthorizedError

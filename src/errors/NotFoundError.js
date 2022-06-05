import { httpStatus } from '../constants'
import ApiError from './ApiError'

class NotFoundError extends ApiError {
  constructor(message, stack) {
    super(httpStatus.NOT_FOUND, message || httpStatus[httpStatus.NOT_FOUND], false, stack)
  }
}

export default NotFoundError

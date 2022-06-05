import { httpStatus } from '../constants'
import ApiError from './ApiError'

class ForbiddenError extends ApiError {
  constructor(message, stack) {
    super(httpStatus.FORBIDDEN, message || httpStatus[httpStatus.FORBIDDEN], false, stack)
  }
}

export default ForbiddenError

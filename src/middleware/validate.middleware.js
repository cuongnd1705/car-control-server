import Joi from 'joi'
import { BadRequestError } from '../errors'
import { pick } from '../utils'

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body'])
  const object = pick(req, Object.keys(validSchema))

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object, { abortEarly: false })

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ')

    return next(new BadRequestError(errorMessage))
  }

  Object.assign(req, value)

  return next()
}

export default validate

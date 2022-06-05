import mongoose from 'mongoose'
import env from './env.config'
import logger from './logger.config'

mongoose.connect(env.mongoose.uri, (err) => {
  if (err) {
    throw new Error(`Unable to connect to the MongoDB: ${err}`)
  }
  logger.info('MongoDB connected successfully.')
})

if (env.mongoose.log) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    logger.debug(`${collectionName}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`)
  })
}

export default mongoose

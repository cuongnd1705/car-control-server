import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import path from 'path'
import { morganError, morganSuccess } from './config/morgan.config'
import { customResponse, errorConverter, errorHandler, invalidApiHandler } from './middleware'
import routes from './routes'

const app = express()

app.use(morganSuccess)
app.use(morganError)

// app.use(helmet())

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

// app.use(compression())

// app.use(cors())
// app.options('*', cors())

// app.use(cookieParser())

app.use(customResponse)

app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', routes)

app.use(invalidApiHandler)

app.use(errorConverter)

app.use(errorHandler)

export default app

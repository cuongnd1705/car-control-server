import express from 'express'
import pointRoute from './point.route'

const router = express.Router()

router.use('/points', pointRoute)

export default router

import express from 'express'
import { pointController } from '../controllers'

const router = express.Router()

router.route('/').post(pointController.createPoint).get(pointController.getAllPoint)

router
  .route('/:pointId')
  .get(pointController.getPointById)
  .put(pointController.updatePoint)
  .delete(pointController.deletePoint)

export default router

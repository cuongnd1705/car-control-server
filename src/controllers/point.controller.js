import { httpStatus } from '../constants'
import { pointService } from '../services'
import { asyncHandler } from '../utils'

export const createPoint = asyncHandler(async (req, res) => {
  const point = await pointService.createPoint(req.body)

  res.successResponse(httpStatus.CREATED, httpStatus[httpStatus.CREATED], point)
})

export const getAllPoint = asyncHandler(async (req, res) => {
  const point = await pointService.getAllPoint()

  res.successResponse(httpStatus.OK, httpStatus[httpStatus.OK], point)
})

export const getPointById = asyncHandler(async (req, res) => {
  const point = await pointService.getPointById(req.params.pointId)

  res.successResponse(httpStatus.OK, httpStatus[httpStatus.OK], point)
})

export const updatePoint = asyncHandler(async (req, res) => {
  const point = await pointService.updatePointById(req.params.pointId, req.body)

  res.successResponse(httpStatus.OK, httpStatus[httpStatus.OK], point)
})

export const deletePoint = asyncHandler(async (req, res) => {
  const point = await pointService.deletePointById(req.params.pointId)

  res.successResponse(httpStatus.OK, httpStatus[httpStatus.OK], point)
})

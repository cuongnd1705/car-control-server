import { NotFoundError } from '../errors'
import { PointModel } from '../models'

export const createPoint = async (createBody) => {
  return PointModel.create(createBody)
}

export const getAllPoint = async () => {
  const points = await PointModel.find()

  const coordinates = points.map((point) => point.coordinates)

  return {
    type: 'LineString',
    coordinates,
  }
}

export const getPointById = async (id) => {
  const point = await PointModel.findById(id)

  if (!point) {
    throw new NotFoundError('Point not found')
  }

  return point
}

export const updatePointById = async (pointId, updateBody) => {
  const point = await getPointById(pointId)

  Object.assign(point, updateBody)

  await point.save()

  return point
}

export const deletePointById = async (pointId) => {
  const point = await getPointById(pointId)

  await point.remove()

  return point
}

import { model, Schema } from 'mongoose'

const pointSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: [
      {
        type: Number,
        required: true,
      },
    ],
  },
  {
    collection: 'point',
    timestamps: true,
  }
)

const PointModel = model('point', pointSchema)

export default PointModel

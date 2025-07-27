import mongoose, { Document, Schema } from 'mongoose'

export interface IFlower extends Document {
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
  rating: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const FlowerSchema = new Schema<IFlower>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Roses', 'Tulips', 'Orchids', 'Lilies', 'Sunflowers', 'Mixed', 'Exotic']
  },
  image: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.5
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Index for efficient queries
FlowerSchema.index({ category: 1 })
FlowerSchema.index({ price: 1 })
FlowerSchema.index({ rating: -1 })
FlowerSchema.index({ isActive: 1 })

export default mongoose.model<IFlower>('Flower', FlowerSchema)
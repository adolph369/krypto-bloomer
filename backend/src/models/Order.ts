import mongoose, { Document, Schema } from 'mongoose'

export interface IOrderItem {
  flowerId: mongoose.Types.ObjectId
  name: string
  price: number
  quantity: number
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId
  items: IOrderItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethod: 'wallet' | 'crypto' | 'card'
  trackingNumber?: string
  createdAt: Date
  updatedAt: Date
}

const OrderItemSchema = new Schema<IOrderItem>({
  flowerId: {
    type: Schema.Types.ObjectId,
    ref: 'Flower',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
})

const OrderSchema = new Schema<IOrder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [OrderItemSchema],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true, default: 'USA' }
  },
  paymentMethod: {
    type: String,
    enum: ['wallet', 'crypto', 'card'],
    default: 'wallet'
  },
  trackingNumber: {
    type: String,
    sparse: true
  }
}, {
  timestamps: true
})

// Index for efficient queries
OrderSchema.index({ userId: 1, createdAt: -1 })
OrderSchema.index({ status: 1 })
OrderSchema.index({ trackingNumber: 1 })

export default mongoose.model<IOrder>('Order', OrderSchema)
import mongoose, { Document, Schema } from 'mongoose'

export interface ITrade extends Document {
  userId: mongoose.Types.ObjectId
  type: 'buy' | 'sell'
  currency: string
  amount: number
  price: number
  status: 'pending' | 'completed' | 'cancelled' | 'failed'
  transactionHash?: string
  createdAt: Date
  updatedAt: Date
}

const TradeSchema = new Schema<ITrade>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['buy', 'sell'],
    required: true
  },
  currency: {
    type: String,
    required: true,
    uppercase: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled', 'failed'],
    default: 'pending'
  },
  transactionHash: {
    type: String,
    sparse: true
  }
}, {
  timestamps: true
})

// Index for efficient queries
TradeSchema.index({ userId: 1, createdAt: -1 })
TradeSchema.index({ status: 1 })
TradeSchema.index({ currency: 1 })

export default mongoose.model<ITrade>('Trade', TradeSchema)
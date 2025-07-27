import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { createClient } from 'redis'

// Import routes
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import tradeRoutes from './routes/trades'
import flowerRoutes from './routes/flowers'
import orderRoutes from './routes/orders'
import analyticsRoutes from './routes/analytics'
import adminRoutes from './routes/admin'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Redis client
export const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
})

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})
app.use(limiter)

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/trades', tradeRoutes)
app.use('/api/flowers', flowerRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/admin', adminRoutes)

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/cryptobloom')
    console.log('✅ MongoDB connected successfully')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1)
  }
}

// Redis connection
const connectRedis = async () => {
  try {
    await redisClient.connect()
    console.log('✅ Redis connected successfully')
  } catch (error) {
    console.error('❌ Redis connection error:', error)
  }
}

// Start server
const startServer = async () => {
  await connectDB()
  await connectRedis()
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
  })
}

startServer().catch(console.error)

export default app
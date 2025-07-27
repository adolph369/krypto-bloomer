import express from 'express'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import User from '../models/User'
import { auth } from '../middleware/auth'
import { sendWelcomeEmail } from '../services/emailService'

const router = express.Router()

// Validation schemas
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

// Register
router.post('/register', async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const { username, email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    })

    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.email === email ? 'Email already registered' : 'Username already taken'
      })
    }

    // Create new user
    const user = new User({
      username,
      email,
      password
    })

    await user.save()

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    )

    // Send welcome email
    try {
      await sendWelcomeEmail(user.email, user.username)
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
    }

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        wallet: user.wallet,
        createdAt: user.createdAt
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        wallet: user.wallet,
        lastLogin: user.lastLogin
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ user })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
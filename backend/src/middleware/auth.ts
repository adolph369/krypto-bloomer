import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

// Extend Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string
      user?: any
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
    req.userId = decoded.userId

    // Optionally fetch user data
    const user = await User.findById(decoded.userId).select('-password')
    if (!user) {
      return res.status(401).json({ message: 'Invalid token. User not found.' })
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' })
  }
}

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await auth(req, res, () => {})
    
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'moderator')) {
      return res.status(403).json({ message: 'Access denied. Admin or moderator role required.' })
    }

    next()
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed.' })
  }
}
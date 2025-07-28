import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'moderator' | 'admin';
  wallet: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'moderator', 'admin'],
    default: 'user'
  },
  wallet: {
    type: Number,
    default: 1000,
    min: 0
  }
}, {
  timestamps: true
});

export const User = mongoose.model<IUser>('User', UserSchema);
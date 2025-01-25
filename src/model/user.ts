// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Reservation {
  date: string;
  timing: string;
  seats: string[];
}

export interface Movie {
  title: string;
  reservations: Reservation[];
}

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  movies: Movie[];
}

const ReservationSchema: Schema<Reservation> = new Schema({
  date: { type: String, required: true },
  timing: { type: String, required: true },
  seats: [{ type: String, required: true }],
});

const MovieSchema: Schema<Movie> = new Schema({
  title: { type: String, required: true },
  reservations: [ReservationSchema],
});

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please use a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  verifyCode: {
    type: String,
    required: [true, 'Please provide a Verify Code'],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, 'Please provide a Verify Code Expiry'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  movies: [MovieSchema],
});

const User =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>('User', UserSchema);

export default User;

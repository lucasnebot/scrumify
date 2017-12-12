import { model, Schema } from 'mongoose';

export interface User {
  email: string;
  name: string;
  surname: string;
  password: string;
}

export const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    required: true,
    min: 0,
    max: 2
  }
});

export const userModel = model('User', userSchema);

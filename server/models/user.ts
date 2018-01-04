import * as mongoose from 'mongoose';

export interface User extends Document {
  email: string;
  name: string;
  surname: string;
  password: string;
  role: number;
}

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
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
  },
  project: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true
  }
});

export const userModel = mongoose.model('User', userSchema);

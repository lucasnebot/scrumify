import * as mongoose from 'mongoose';
import { userSchema } from './user';

export const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['TODO','DOING', 'REVIEW','DONE'],
        default: 'TODO',
        required: false
      },
      estimation: {
          type: Number,
          required: false
      },
      backlogItem:{
        type: [mongoose.Schema.Types.ObjectId]
      },
    User: {
        type: [mongoose.Schema.Types.ObjectId]
    }
});

export const taskModel = mongoose.model('Task', taskSchema);

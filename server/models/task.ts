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
    User: {
        type: userSchema,
        default: null
    }
});

export const taskModel = mongoose.model('Task', taskSchema);

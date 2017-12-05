import * as mongoose from 'mongoose';

export const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    vision: {
        type: String,
        required: true
    },
    defDone: {
        type: String,
        required: false,
        default: ''
    },
    user: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    backlogitem: {
        type: [mongoose.Schema.Types.ObjectId]
    }
});

export const projectModel = mongoose.model('project', projectSchema);

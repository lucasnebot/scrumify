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
        default: ''
    },
    sprintDuration: {
        type: Number,
        default:0
    },
    storyPointsPerSprint: {
        type: Number,
        default:0
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    backlogitems: {
        type: [mongoose.Schema.Types.ObjectId]
    }
});

export const projectModel = mongoose.model('project', projectSchema);

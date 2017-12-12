import * as mongoose from 'mongoose';

export const sprintSchema = new mongoose.Schema({
    sprintNo: {
        type: Number,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    backlogitem: {
        type: [mongoose.Schema.Types.ObjectId]
    }
});

export const sprintModel = mongoose.model('Sprint', sprintSchema);

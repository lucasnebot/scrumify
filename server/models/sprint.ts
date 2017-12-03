import * as mongoose from 'mongoose';

const sprintSchema = new mongoose.Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    backlogItems: {
        type: [mongoose.Schema.Types.ObjectId]
    }
});

const sprint = mongoose.model('Sprint', sprintSchema);
export default sprint;

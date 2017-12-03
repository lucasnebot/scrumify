import * as mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        default: ""
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }
});

const task = mongoose.model("Task", taskSchema);

export default task;

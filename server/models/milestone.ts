import * as mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema({
    title: String,
    description: String,
    Date: Date
});

const milestone = mongoose.model('Milestone',milestoneSchema);

export default milestone;
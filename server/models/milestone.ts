import * as mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    required: true
  }
});

const milestone = mongoose.model("Milestone", milestoneSchema);

export default milestone;

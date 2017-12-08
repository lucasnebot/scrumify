import * as mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  achieved: {
    type: Boolean,
    default: false
  }
});

const milestone = mongoose.model('Milestone', milestoneSchema);

export default milestone;

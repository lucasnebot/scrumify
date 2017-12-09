import * as mongoose from 'mongoose';

export const milestoneSchema = new mongoose.Schema({
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

export const milestoneModel = mongoose.model('Milestone', milestoneSchema);

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
  backlogItems: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

export const sprintModel = mongoose.model('Sprint', sprintSchema);

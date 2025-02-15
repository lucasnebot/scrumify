import * as mongoose from 'mongoose';
/**
 * Default backlog item schema
 */
export const backlogItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  estimation: {
    type: Number
  },
  status: {
    type: String,
    enum: ['EPIC', 'RFE', 'RFS', 'SPRINT', 'DONE'],
    default: 'RFE'
  },
  tasks: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  voted: {
    type: [mongoose.Schema.Types.Mixed]
  },
  project: {
    type: mongoose.Schema.Types.ObjectId
  },
  sprint: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  }
});

export const backlogItemModel = mongoose.model('BacklogItem', backlogItemSchema);

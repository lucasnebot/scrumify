import * as mongoose from 'mongoose';

const options = { discriminatorKey: 'type' };

/**
 * Default backlog item schema
 */
export const backlogItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  order: {
    type: Number,
    required: true
  }
},  options);

export const backlogItemModel = mongoose.model('BacklogItem', backlogItemSchema);

/**
 * User story, inherits from default backlog item schema
 */
export const userStorySchema = new mongoose.Schema({
  estimation: {
    type: Number
  },
  status: {
    type: String,
    enum: ['NEW', 'RFE', 'RFS'],
    default: 'NEW'
  },
  task: {
    type: [mongoose.Schema.Types.ObjectId]
  }
}, options);

export const userStoryModel = backlogItemModel.discriminator('UserStory', userStorySchema);

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
    type: String
  },
  order: {
    type: Number,
    required: true
  }
},  { discriminatorKey: 'kind' });

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
});

export const backlogItemModel = mongoose.model('BacklogItem', backlogItemSchema);
export const userStoryModel = backlogItemModel.discriminator('UserStory', userStorySchema);

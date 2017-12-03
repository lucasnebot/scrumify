import * as mongoose from 'mongoose';


const backlogItemSchema = new mongoose.Schema({
  userStory: {
    type: String,
    required: true
  },
  estimation: {
    type: Number,
    default: null
  },
  backlogStatus: {
    type: String,
    enum: ['new', 'Ready for estimation', 'Ready for Sprint'],
    default: 'new'
  },
  order: {
    type: Number,
    default: null
  },
  tasks: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  sprint: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const backlogItem = mongoose.model('BacklogItem', backlogItemSchema);

export default backlogItem;

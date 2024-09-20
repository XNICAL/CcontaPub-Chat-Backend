const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {connection} = require('./connectDatabase')

const messageSchema = new Schema({
  conversationId: {
    ref:'Conversation',
    type: Schema.Types.ObjectId,
    required: [true,"ERROR_MOONGOSE_REQUIRED"],
  },
  senderId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['text'],
    required: true
  },
  content: {
    type: String,
    maxlength: 1000
  },
  mediaUrl: String,
  replyTo: Schema.Types.ObjectId,
  reactions: [{
    userId: String,
    type: {
      type: String,
      enum: ['like']
    }
  }],
  readBy: [{
    userId: String,
    timestamp: Date
  }],
  timestamp: {
    type: Date,
    default: Date.now
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

messageSchema.methods.getFields = function() {
  return ['conversationId', 'senderId', 'type', 'content', 'mediaUrl', 'replyTo', 'reactions', 'readBy', 'timestamp', 'isEdited', 'isDeleted'];
};

module.exports = connection().model('Message', messageSchema);

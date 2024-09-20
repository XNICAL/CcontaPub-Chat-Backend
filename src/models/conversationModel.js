const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {connection} = require('./connectDatabase')
const messageSchema = require('./messageModel');
const notificationSchema = require('./notificationModel');

const conversationSchema = new Schema({
    type: {
      type: String,
      default:'individual',
      enum: ['individual', 'group'],
      required: true
    },
    participants: {
      type: [{
        ref:'User',
        type: Schema.Types.ObjectId,
        required: [true,"ERROR_MOONGOSE_REQUIRED"],
      }],
      required: true
    },
    admin: {
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    title: {
      type: String,  // Solo para grupos
      maxlength: 150
    },
    lastMessage: {
      senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      content: {
        type: String,
        maxlength: 500
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    },
    metadata: {
      totalMessages: {
        type: Number,
        default: 0
      },
      isArchived: {
        type: Boolean,
        default: false
      }
    },
    expiresAt: {
        type: Date,
        default: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    }
},{ timestamps: true });

conversationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

conversationSchema.methods.getFields = function() {
    return ['type', 'participants', 'admin', 'title', 'lastMessage', 'metadata'];
};

conversationSchema.pre('remove', async function(next) {
    try {
      const conversationId = this._id;
      
      await messageSchema.deleteMany({ conversationId });
      
      await notificationSchema.deleteMany({ 'metadata.conversation.id': conversationId });
      
      next();
    } catch (error) {
      next(error);
    }
});
  
module.exports = connection().model('Conversation', conversationSchema);
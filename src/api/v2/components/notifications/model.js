import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    observerId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    objectId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    objectName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: '',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;

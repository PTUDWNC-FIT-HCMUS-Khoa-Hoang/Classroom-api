import mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    classroomId: {
      type: mongoose.Types.ObjectId,
      ref: 'Classroom',
      required: true,
    },
    role: {
      type: String,
      default: 'teacher',
    },
    isPendding: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Invitation = mongoose.model('Invitation', invitationSchema);

export default Invitation;

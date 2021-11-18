import mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    classroomId: {
      type: mongoose.Types.ObjectId,
      ref: 'Classroom',
      required: true,
    },
    role: {
      type: String,
      default: 'student',
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

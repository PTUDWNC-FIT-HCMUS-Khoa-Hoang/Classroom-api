import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subTitle: {
      type: String,
    },
    invitationCode: {
      type: String,
      index: true,
    },
    gradeStructure: [
      {
        title: {
          type: String,
          required: true,
        },
        grade: {
          type: Number,
          required: true,
        },
      },
    ],
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Classroom = mongoose.model('Classroom', classroomSchema);

export default Classroom;

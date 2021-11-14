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
    gradings: [
      {
        title: {
          type: String,
          required: true,
        },
        ratio: {
          type: Number,
          required: true,
          min: 0,
          max: 1,
        },
      },
    ],
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Classroom = mongoose.model('Classroom', classroomSchema);

export default Classroom;

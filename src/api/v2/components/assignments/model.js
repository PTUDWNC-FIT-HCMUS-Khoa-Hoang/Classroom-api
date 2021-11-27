import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
    classroomId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    displayOrder: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;

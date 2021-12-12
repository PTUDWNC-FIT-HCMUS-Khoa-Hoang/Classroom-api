import mongoose from 'mongoose';

const gradeDetailSchema = new mongoose.Schema(
  {
    classroomId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Classroom',
    },
    studentId: {
      type: String,
      required: true,
    },
    gradeId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Classroom.gradeStructure',
    },
    grade: {
      type: Number,
      min: [0, 'Điểm không được bé hơn 0'],
      max: [100, 'Điểm không được vượt quá 100'],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const GradeDetail = mongoose.model('GradeDetail', gradeDetailSchema);
export default GradeDetail;

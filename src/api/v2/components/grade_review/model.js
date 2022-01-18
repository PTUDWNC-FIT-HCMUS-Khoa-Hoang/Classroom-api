import mongoose from 'mongoose';

const gradeReviewSchema = new mongoose.Schema(
  {
    gradeDetail: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'GradeDetail',
    },
    studentExpectation: {
      type: Number,
      required: true,
    },
    studentExplanation: {
      type: String,
    },
    teacherComment: {
      type: String,
    },
    isFinalDecision: {
      type: Boolean,
      default: false,
    },
    oldGrade: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const GradeReview = mongoose.model('GradeReview', gradeReviewSchema);

export default GradeReview;

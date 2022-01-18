import gradeReviewServices from '.';
import classroomServices from '../../classrooms/services';
import gradeDetailServices from '../../grade_detail/services';
import notificationServices from '../../notifications/services';
import userServices from '../../users/services';
import GradeReview from '../model';
import gradeReviewValidations from '../validations';

const putOne = async (gradeReviewId, data, teacherId) => {
  const gradeReview = await gradeReviewServices.getOne({
    _id: gradeReviewId,
  });
  const gradeDetail = await gradeDetailServices.getOneById(
    gradeReview.gradeDetail
  );
  const classroom = await classroomServices.getOneById(gradeDetail.classroomId);
  const student = await userServices.getOneByStudentId(gradeDetail.studentId);
  const teacher = await userServices.getOneByUserId(teacherId);
  const gradeColumn = classroom.gradeStructure.find(
    (grade) => grade._id.toString() === gradeDetail.gradeId.toString()
  );

  // validate data first
  const validatedData = await gradeReviewValidations.update.validate(data);

  // if this is final decision
  const { upgradedGrade, isFinalDecision } = validatedData;
  if (upgradedGrade && isFinalDecision) {
    // update old grade
    const oldGrade = gradeDetail.grade;
    validatedData.oldGrade = oldGrade;
    // update new grade in gradeDetail
    gradeDetail.grade = upgradedGrade;
    gradeDetail.save();
    // nofity to student
    notificationServices.notify({
      subjectId: teacherId,
      observerId: student._id,
      objectId: gradeReview._id,
      objectName: 'grade-review',
      message: `Đơn phúc khảo của bạn tại lớp '${classroom.title}' đã có quyết định cuối cùng.`,
    });
  }

  // if this has comment
  const { teacherComment } = validatedData;
  if (teacherComment) {
    notificationServices.notify({
      subjectId: teacherId,
      observerId: student._id,
      objectId: gradeReview._id,
      objectName: 'grade-review',
      message: `Giáo viên '${teacher.email}' đã bình luận về yêu cầu phúc khảo tại cột điểm '${gradeColumn.title}' trong lớp học '${classroom.title}'.`,
    });
  }

  // update gradeReview
  const updatedGradeReview = await GradeReview.findByIdAndUpdate(
    gradeReviewId,
    validatedData,
    { new: true }
  );
  return updatedGradeReview;
};

export default putOne;

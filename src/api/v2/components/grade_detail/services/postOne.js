import Classroom from '../../classrooms/model';
import GradeDetail from '../model';
import gradeDetailValidator from '../validation';

const postOne = async (gradeDetailData) => {
  try {
    const classroom = await Classroom.findById(gradeDetailData.classroomId);

    gradeDetailValidator.checkGradeId(classroom, gradeDetailData.gradeId);

    let gradeDetail = null;

    // Try to search a grade detail in Database
    const availableGradeDetail = await GradeDetail.findOne({
      classroomId: gradeDetailData.classroomId,
      studentId: gradeDetailData.studentId,
      gradeId: gradeDetailData.gradeId,
    });

    if (availableGradeDetail) {
      // If there is already a grade detail in Database
      gradeDetail = availableGradeDetail;
      gradeDetail.grade = gradeDetailData.grade;
      gradeDetail.studentName = gradeDetailData.studentName;
    } else {
      // Create a new grade detail
      gradeDetail = new GradeDetail(gradeDetailData);
    }

    await gradeDetail.save();
    return gradeDetail;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default postOne;

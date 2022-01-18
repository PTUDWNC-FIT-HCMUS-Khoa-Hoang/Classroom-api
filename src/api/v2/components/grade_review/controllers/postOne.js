import gradeDetailServices from '../../grade_detail/services';
import notificationServices from '../../notifications/services';
import userServices from '../../users/services';
import classroomServices from '../../classrooms/services';
import gradeReviewServices from '../services';

const postOne = async (req, res) => {
  // const requestUser = req.user;
  const gradeDetailId = req.body.gradeDetail;

  try {
    // check student id
    const requestUser = await userServices.getOneByUserId(req.user.id);
    const gradeDetail = await gradeDetailServices.getOneById(gradeDetailId);
    if (requestUser.studentId !== gradeDetail.studentId) {
      throw new Error('Bạn không có quyền yêu cầu phúc khảo');
    }

    const gradeReview = await gradeReviewServices.postOne(req.body);

    // notification
    const { classroomId } = gradeDetail;
    const classroom = await classroomServices.getOneById(classroomId);
    const reviewingGrade = classroom.gradeStructure?.find(
      (grade) => grade._id.toString() === gradeDetail.gradeId.toString()
    );
    // notify to owner
    const { owner } = classroom;

    notificationServices.notify({
      subjectId: requestUser._id,
      observerId: owner,
      objectId: gradeReview._id,
      objectName: 'grade-review',
      message: `Sinh viên ${requestUser.studentId} vừa tạo một yêu cầu phúc khảo ở lớp học ${classroom.title} tại cột điểm ${reviewingGrade.title}.`,
    });
    // notify to teachers

    // hasReviewed: true

    res.status(201).send(gradeReview);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default postOne;

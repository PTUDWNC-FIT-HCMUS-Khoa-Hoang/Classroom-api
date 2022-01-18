import ROLES from '../../../constants/role';
import checkRole from '../../classrooms/helpers/checkRole';
import classroomServices from '../../classrooms/services';
import gradeDetailServices from '../../grade_detail/services';
import gradeReviewServices from '../services';

const putOneById = async (req, res) => {
  const gradeReviewId = req.params.id;

  try {
    const gradeReview = await gradeReviewServices.getOne({
      _id: gradeReviewId,
    });
    const gradeDetail = await gradeDetailServices.getOneById(
      gradeReview.gradeDetail
    );
    const classroom = await classroomServices.getOneById(
      gradeDetail.classroomId
    );

    await checkRole({
      userId: req.user.id,
      classroomId: classroom._id.toString(),
      roles: [ROLES.TEACHER],
    });

    const updatedGradeReview = await gradeReviewServices.putOne(
      gradeReviewId,
      req.body,
      req.user.id
    );
    res.status(200).send(updatedGradeReview);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default putOneById;

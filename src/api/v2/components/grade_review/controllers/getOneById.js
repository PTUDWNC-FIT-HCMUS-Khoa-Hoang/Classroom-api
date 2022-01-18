import ROLES from '../../../constants/role';
import checkRole from '../../classrooms/helpers/checkRole';
import gradeDetailServices from '../../grade_detail/services';
import gradeReviewServices from '../services';

const getOneById = async (req, res) => {
  const gradeReviewId = req.params.id;

  try {
    const gradeReview = await gradeReviewServices.getOne({
      _id: gradeReviewId,
    });

    const gradeDetail = await gradeDetailServices.getOneById(
      gradeReview.gradeDetail
    );
    await checkRole({
      classroomId: gradeDetail.classroomId,
      userId: req.user.id,
      roles: [ROLES.TEACHER, ROLES.STUDENT],
    });

    res.status(200).send({
      ...gradeReview._doc,
      gradeDetail,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getOneById;

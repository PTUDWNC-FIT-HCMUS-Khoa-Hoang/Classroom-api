import gradeDetailServices from '../../grade_detail/services';
import gradeReviewServices from '../services';
import checkRole from '../../classrooms/helpers/checkRole';
import ROLES from '../../../constants/role';

const getAllByClassroomId = async (req, res) => {
  const { classroomId } = req.params;

  try {
    await checkRole({
      userId: req.user.id,
      classroomId,
      roles: [ROLES.TEACHER],
    });

    const gradeDetails = await gradeDetailServices.getByClassroomId(
      classroomId
    );

    const gradeReviewsByClassroom = await Promise.all(
      gradeDetails.map(async (gradeDetail) => {
        const gradeReview = await gradeReviewServices.getOne({
          gradeDetail: gradeDetail._id.toString(),
        });

        return gradeReview;
      })
    );

    const nullFiltered = gradeReviewsByClassroom.filter((notNull) => notNull);

    res.status(200).send(nullFiltered);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getAllByClassroomId;

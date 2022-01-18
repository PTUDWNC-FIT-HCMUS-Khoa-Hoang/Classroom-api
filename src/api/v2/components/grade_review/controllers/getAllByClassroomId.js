import gradeDetailServices from '../../grade_detail/services';
import gradeReviewServices from '../services';

const getAllByClassroomId = async (req, res) => {
  const { classroomId } = req.params;

  try {
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

    res.status(200).send(gradeReviewsByClassroom);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getAllByClassroomId;

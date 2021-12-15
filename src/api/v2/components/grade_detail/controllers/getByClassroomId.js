import Classroom from '../../classrooms/model';
import gradeDetailServices from '../services';

const getByClassroomId = async (req, res) => {
  const classroomId = req.params.classroomId;

  try {
    const classroom = await Classroom.findById(classroomId);

    const rawGradeDetails = await gradeDetailServices.getByClassroomId(
      classroomId
    );

    const gradeBoard = gradeDetailServices.fulfillGradeBoard(
      classroom,
      rawGradeDetails
    );

    res.status(200).send(gradeBoard);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getByClassroomId;

import ROLES from '../../../constants/role';
import checkRole from '../../classrooms/helpers/checkRole';
import Classroom from '../../classrooms/model';
import gradeDetailServices from '../services';

const getByClassroomId = async (req, res) => {
  const classroomId = req.params.classroomId;

  try {
    await checkRole({
      userId: req.user.id,
      classroomId: classroomId,
      roles: [ROLES.OWNER],
    });

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

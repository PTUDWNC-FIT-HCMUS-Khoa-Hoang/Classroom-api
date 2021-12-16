import ROLES from '../../../constants/role';
import checkRole from '../../classrooms/helpers/checkRole';
import Classroom from '../../classrooms/model';
import gradeDetailServices from '../services';

const getCsvDataByClassroomId = async (req, res) => {
  const classroomId = req.params.classroomId;

  try {
    await checkRole({
      userId: req.user.id,
      classroomId,
      roles: [ROLES.OWNER],
    });

    const classroom = await Classroom.findById(classroomId);

    const rawGradeDetails = await gradeDetailServices.getByClassroomId(
      classroomId
    );

    const csvData = gradeDetailServices.toCsvDataByClassroomId(
      rawGradeDetails,
      classroom
    );

    res.header('Content-Type', 'text/csv');
    res.attachment(`grade-template-${classroomId}.csv`);
    res.status(200).send(csvData);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getCsvDataByClassroomId;

import GradeDetail from '../model';
import Classroom from '../../classrooms/model';
import parseErrorIntoMessage from '../../../helpers/parseErrorIntoMessage';
import gradeDetailServices from '../services';
import checkRole from '../../classrooms/helpers/checkRole';
import ROLES from '../../../constants/role';

const getCsvDataByGradeId = async (req, res) => {
  const { classroomId, gradeId } = req.params;

  try {
    await checkRole({
      userId: req.user.id,
      classroomId: classroomId,
      roles: [ROLES.OWNER],
    });

    const classroom = await Classroom.findById(classroomId);

    const gradeDetails = await GradeDetail.find({
      classroomId,
      gradeId,
    });

    const csvData = gradeDetailServices.toCsvByGradeId(
      gradeDetails,
      classroom,
      gradeId
    );

    res.header('Content-Type', 'text/csv');
    res.attachment(`grade-detail-${gradeId}.csv`);
    res.status(200).send(csvData);
  } catch (error) {
    res.status(400).send(parseErrorIntoMessage(error));
  }
};

export default getCsvDataByGradeId;

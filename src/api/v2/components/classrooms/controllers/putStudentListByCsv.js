import ROLES from '../../../constants/role';
import parseErrorIntoMessage from '../../../helpers/parseErrorIntoMessage';
import checkRole from '../helpers/checkRole';
import classroomServices from '../services';

const putStudentListByCsv = async (req, res) => {
  try {
    const csvFile = req.files.csv;
    const classroomId = req.params.classroomId;

    await checkRole({
      classroomId,
      userId: req.user.id,
      roles: [ROLES.OWNER],
    });

    const studentList = await classroomServices.parseCsvToStudentList(
      csvFile.tempFilePath
    );

    const updatedClassroom = await classroomServices.putOneById(classroomId, {
      studentList,
    });

    res.status(200).send(updatedClassroom);
  } catch (error) {
    res.status(400).send(parseErrorIntoMessage(error));
  }
};

export default putStudentListByCsv;

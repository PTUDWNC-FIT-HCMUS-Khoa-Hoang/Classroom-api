import gradeDetailServices from '../services';
import Classroom from '../../classrooms/model';
import checkRole from '../../classrooms/helpers/checkRole';
import ROLES from '../../../constants/role';

const postCsvDataByGradeId = async (req, res) => {
  const csvFile = req.files.csv;
  const classroomId = req.params.classroomId;
  const gradeId = req.params.gradeId;

  try {
    await checkRole({
      userId: req.user.id,
      classroomId: gradeDetailData.classroomId,
      roles: [ROLES.OWNER],
    });

    const classroom = await Classroom.findById(classroomId);

    const gradeDetailsData = await gradeDetailServices.parseCsvByGradeId(
      csvFile.tempFilePath,
      classroom,
      gradeId
    );

    const gradeDetails = await Promise.all(
      gradeDetailsData.map(async (gradeDetail) => {
        const result = await gradeDetailServices.postOne(gradeDetail);
        return result;
      })
    );

    res.status(200).send(gradeDetails);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default postCsvDataByGradeId;

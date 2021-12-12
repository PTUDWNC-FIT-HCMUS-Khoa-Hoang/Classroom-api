import gradeDetailServices from '../services';
import Classroom from '../../classrooms/model';

const postByCsv = async (req, res) => {
  const csvFile = req.files.csv;
  const classroomId = req.params.classroomId;

  try {
    const classroom = await Classroom.findById(classroomId);

    const gradeDetailsData = await gradeDetailServices.parseCsvToGradeDetails(
      csvFile.tempFilePath,
      classroom
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

export default postByCsv;

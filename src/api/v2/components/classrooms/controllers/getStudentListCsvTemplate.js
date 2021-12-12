import parseErrorIntoMessage from '../../../helpers/parseErrorIntoMessage';
import classroomServices from '../services';

const getStudentListCsvTemplate = async (req, res) => {
  const classroomId = req.params.classroomId;

  try {
    const classroom = await classroomServices.getOneById(classroomId);

    const csvData = classroomServices.parseStudentListToCsvFile(
      classroom.studentList
    );

    res.header('Content-Type', 'text/csv');
    res.attachment(`student-list-template-${classroomId}.csv`);
    res.status(200).send(csvData);
  } catch (error) {
    res.status(400).send(parseErrorIntoMessage(error));
  }
};

export default getStudentListCsvTemplate;

import jsonToCsvData from '../../../helpers/jsonToCsvData';

const parseStudentListToCsvFile = (studentList) => {
  const fieldNames = ['studentId', 'studentName'];

  const csvData = jsonToCsvData(studentList, fieldNames);

  return csvData;
};

export default parseStudentListToCsvFile;

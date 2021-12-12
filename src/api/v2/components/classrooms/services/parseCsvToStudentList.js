import deletePublicDirectory from '../../../helpers/deletePublicDirectory';
import parseCsvFile from '../../../helpers/parseCsvFile';

const parseCsvToStudentList = async (csvFilePath) => {
  // parse csv data
  const rawData = await parseCsvFile(csvFilePath);

  // csv data to json data
  const rows = JSON.parse(JSON.stringify(rawData));

  // parse to [{studentId: _, studentName: _}]
  const studentList = rows.map((row) => {
    const keys = Object.keys(row);
    const studentIdKey = keys[0];
    const studentNameKey = keys[1];

    return {
      studentId: row[studentIdKey],
      studentName: row[studentNameKey],
    };
  });

  // delete public dir
  deletePublicDirectory();

  return studentList;
};

export default parseCsvToStudentList;

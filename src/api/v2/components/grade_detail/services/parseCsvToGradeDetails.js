import deletePublicDirectory from '../../../helpers/deletePublicDirectory';
import parseCsvFile from '../../../helpers/parseCsvFile';

const parseCsvToGradeDetails = async (csvFilePath, classroom) => {
  const rawData = await parseCsvFile(csvFilePath);

  const rows = JSON.parse(JSON.stringify(rawData));

  const mappedGradeTitles = {};
  classroom.gradeStructure.forEach((grade) => {
    mappedGradeTitles[grade.title] = grade._id.toString();
  });

  let gradeDetails = [];
  rows.map((row) => {
    const studentIdKey = Object.keys(row)[0];

    const gradeDetail = {
      classroomId: classroom._id,
      studentId: row[studentIdKey],
    };

    delete row[studentIdKey];

    for (const key in row) {
      gradeDetails.push({
        ...gradeDetail,
        gradeId: mappedGradeTitles[key],
        grade: row[key],
      });
    }
  });

  deletePublicDirectory();

  return gradeDetails;
};

export default parseCsvToGradeDetails;

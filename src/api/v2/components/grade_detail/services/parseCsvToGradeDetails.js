import deletePublicDirectory from '../../../helpers/deletePublicDirectory';
import parseCsvFile from '../../../helpers/parseCsvFile';

const parseCsvToGradeDetails = async (csvFilePath, classroom) => {
  // parse csv data
  const rawData = await parseCsvFile(csvFilePath);

  // csv data to json data
  const rows = JSON.parse(JSON.stringify(rawData));

  // object['gradeTitle'] = gradeId
  const mappedGradeTitles = {};
  classroom.gradeStructure.forEach((grade) => {
    mappedGradeTitles[grade.title] = grade._id.toString();
  });

  // transform to gradeDetails array
  let gradeDetails = [];
  rows.map((row) => {
    const studentIdKey = Object.keys(row)[0];
    const studentNameKey = Object.keys(row)[1];

    const gradeDetail = {
      classroomId: classroom._id,
      studentId: row[studentIdKey],
      studentName: row[studentNameKey],
    };

    delete row[studentIdKey];
    delete row[studentNameKey];

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

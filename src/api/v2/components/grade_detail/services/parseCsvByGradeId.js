import deletePublicDirectory from '../../../helpers/deletePublicDirectory';
import parseCsvFile from '../../../helpers/parseCsvFile';

const parseCsvByGradeId = async (csvFilePath, classroom, gradeId) => {
  // parse csv data
  const rawData = await parseCsvFile(csvFilePath);

  // csv data to json data
  const rows = JSON.parse(JSON.stringify(rawData));

  // object['gradeTitle'] = gradeId
  // const mappedGradeTitles = {};
  // classroom.gradeStructure.forEach((grade) => {
  //   mappedGradeTitles[grade.title] = grade._id.toString();
  // });

  // transform to gradeDetails array
  let gradeDetails = [];
  rows.map((row) => {
    const studentIdKey = Object.keys(row)[0];
    const gradeKey = Object.keys(row)[1];

    const gradeDetail = {
      classroomId: classroom._id,
      studentId: row[studentIdKey],
      gradeId,
      grade: row[gradeKey],
    };

    gradeDetails.push(gradeDetail);
  });

  deletePublicDirectory();

  return gradeDetails;
};

export default parseCsvByGradeId;

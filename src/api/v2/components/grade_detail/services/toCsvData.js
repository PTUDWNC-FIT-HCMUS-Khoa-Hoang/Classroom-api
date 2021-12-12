import jsonToCsvData from '../../../helpers/jsonToCsvData';
import mapObjectToArray from '../../../helpers/mapObjectToArray';

const toCsvData = (gradeDetailsData, classroom) => {
  console.log(
    '🚀 ~ file: toCsvData.js ~ line 5 ~ toCsvData ~ gradeDetailsData',
    gradeDetailsData
  );
  // Map grade title -> grade id
  const mappedGradeId = {};
  classroom.gradeStructure.map((detail) => {
    mappedGradeId[detail._id] = detail.title;
  });

  // Create {studentId: {grade1: _, grade2: _}}
  const gradeDetailsGroupByStudentId = {};
  gradeDetailsData.forEach((gradeDetail) => {
    if (!gradeDetailsGroupByStudentId[gradeDetail.studentId]) {
      gradeDetailsGroupByStudentId[gradeDetail.studentId] = {};
    }
    gradeDetailsGroupByStudentId[gradeDetail.studentId][
      mappedGradeId[gradeDetail.gradeId]
    ] = gradeDetail.grade;
  });

  // Transform object -> array
  const gradeDetails = mapObjectToArray(
    gradeDetailsGroupByStudentId,
    'studentId'
  );

  // Create csv data
  const fieldKeys = classroom.gradeStructure.map((detail) => detail.title);
  const csvData = jsonToCsvData(gradeDetails, fieldKeys);

  return csvData;
};

export default toCsvData;

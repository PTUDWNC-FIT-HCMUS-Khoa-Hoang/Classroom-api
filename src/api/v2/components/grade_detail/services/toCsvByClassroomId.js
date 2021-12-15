import jsonToCsvData from '../../../helpers/jsonToCsvData';
import mapObjectToArray from '../../../helpers/mapObjectToArray';

const toCsvDataByClassroomId = (gradeDetailsData, classroom) => {
  // Map grade title -> grade id
  // {
  //   [gradeId] = gradeTitle
  // }
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
  const csvData = jsonToCsvData(gradeDetails, ['studentId', ...fieldKeys]);

  return csvData;
};

export default toCsvDataByClassroomId;

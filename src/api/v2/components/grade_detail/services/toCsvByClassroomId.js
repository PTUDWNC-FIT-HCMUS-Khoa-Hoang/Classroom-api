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

  // Create [{[studentId]: {}}]
  const gradeDetailsGroupByStudentId = {};
  classroom.studentList.forEach((student) => {
    if (!gradeDetailsGroupByStudentId[student.studentId]) {
      gradeDetailsGroupByStudentId[student.studentId] = {};
    }
  });
  // Create {[studentId]: {grade1: _, grade2: _}}
  gradeDetailsData.forEach((gradeDetail) => {
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

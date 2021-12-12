import jsonToCsvData from '../../../helpers/jsonToCsvData';
import mapObjectToArray from '../../../helpers/mapObjectToArray';

const toCsvData = (gradeDetailsData, classroom) => {
  // Map grade title -> grade id
  const mappedGradeId = {};
  classroom.gradeStructure.map((detail) => {
    mappedGradeId[detail._id] = detail.title;
  });

  // Create {studentId: {studentName: _, grade1: _, grade2: _}}
  const gradeDetailsGroupByStudentId = {};
  gradeDetailsData.forEach((gradeDetail) => {
    if (!gradeDetailsGroupByStudentId[gradeDetail.studentId]) {
      gradeDetailsGroupByStudentId[gradeDetail.studentId] = {
        studentName: gradeDetail.studentName,
      };
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
  const gradeKeys = classroom.gradeStructure.map((detail) => detail.title);
  const fieldKeys = ['studentId', 'studentName', ...gradeKeys];
  // csv template data
  let gradeStructureTemplate = {};
  gradeKeys.forEach((gradeKey) => {
    gradeStructureTemplate[gradeKey] = 100;
  });

  const gradeDetailTemplate = {
    studentId: 'STU001',
    studentName: 'Nguyen Van A',
    ...gradeStructureTemplate,
  };

  const gradeDetailData =
    gradeDetails.length > 0 ? gradeDetails : gradeDetailTemplate;
  const csvData = jsonToCsvData(gradeDetailData, fieldKeys);

  return csvData;
};

export default toCsvData;

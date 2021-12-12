import jsonToCsvData from '../../../helpers/jsonToCsvData';
import mapObjectToArray from '../../../helpers/mapObjectToArray';

const toCsvData = (gradeDetailsData, classroom, gradeId) => {
  // Create {
  //  [studentId]: {
  //    grade: 0
  //  }
  // }
  const gradeDetailObject = {};
  classroom.studentList.forEach((student) => {
    gradeDetailObject[student.studentId] = {
      grade: 0,
    };
  });

  // Update grade by student id
  gradeDetailsData.forEach((detail) => {
    gradeDetailObject[detail.studentId].grade = detail.grade;
  });

  // Create [{studentId: _ ,grade: _}]
  const gradeDetails = mapObjectToArray(gradeDetailObject, 'studentId');

  // grade title
  const { gradeStructure } = classroom;
  const foundGrade = gradeStructure.find(
    (detail) => detail._id.toString() === gradeId
  );

  // Generate field keys
  const fieldKeys = ['studentId', foundGrade.title];

  // Create csv data
  const csvData = jsonToCsvData(gradeDetails, fieldKeys);

  return csvData;
};

export default toCsvData;

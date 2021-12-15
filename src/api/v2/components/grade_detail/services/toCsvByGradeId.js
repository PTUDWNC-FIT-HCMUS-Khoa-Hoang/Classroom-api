import jsonToCsvData from '../../../helpers/jsonToCsvData';
import mapObjectToArray from '../../../helpers/mapObjectToArray';

const toCsvByGradeId = (gradeDetailsData, classroom, gradeId) => {
  // Create {
  //  [studentId]: {
  //    grade: null
  //  }
  // }
  const gradeDetailObject = {};
  classroom.studentList.forEach((student) => {
    gradeDetailObject[student.studentId] = {
      grade: null,
    };
  });

  // Update grade by student id
  gradeDetailsData.forEach((detail) => {
    gradeDetailObject[detail.studentId].grade = detail.grade;
  });

  // Create [{studentId: _ ,grade: _}]
  const gradeDetails = mapObjectToArray(gradeDetailObject, 'studentId');

  // Generate field keys
  const fieldKeys = ['studentId', 'grade'];

  // Create csv data
  const csvData = jsonToCsvData(gradeDetails, fieldKeys);

  return csvData;
};

export default toCsvByGradeId;

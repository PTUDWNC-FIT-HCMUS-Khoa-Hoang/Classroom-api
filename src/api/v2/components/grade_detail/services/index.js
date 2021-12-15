import postOne from './postOne';
import parseCsvByGradeId from './parseCsvByGradeId';
import getByClassroomId from './getByClassroomId';
import toCsvDataByClassroomId from './toCsvByClassroomId';
import toCsvByGradeId from './toCsvByGradeId';

const gradeDetailServices = {
  postOne,
  parseCsvByGradeId,
  getByClassroomId,
  toCsvDataByClassroomId,
  toCsvByGradeId,
};

export default gradeDetailServices;

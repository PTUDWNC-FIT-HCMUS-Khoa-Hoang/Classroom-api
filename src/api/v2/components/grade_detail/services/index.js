import postOne from './postOne';
import parseCsvByGradeId from './parseCsvByGradeId';
import getByClassroomId from './getByClassroomId';
import toCsvDataByClassroomId from './toCsvByClassroomId';
import toCsvByGradeId from './toCsvByGradeId';
import fulfillGradeBoard from './fulfillGradeBoard';

const gradeDetailServices = {
  postOne,
  parseCsvByGradeId,
  getByClassroomId,
  toCsvDataByClassroomId,
  toCsvByGradeId,
  fulfillGradeBoard,
};

export default gradeDetailServices;

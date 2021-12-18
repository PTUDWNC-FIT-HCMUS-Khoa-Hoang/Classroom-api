import parseCsvToStudentList from './parseCsvToStudentList';
import putOneById from './putOneById';
import getOneById from './getOneById';
import parseStudentListToCsvFile from './parseStudentListToCsvFile';
import mergeStudentList from './mergeStudentList';

const classroomServices = {
  parseCsvToStudentList,
  putOneById,
  getOneById,
  parseStudentListToCsvFile,
  mergeStudentList,
};

export default classroomServices;

import Classroom from '../model';

const getOneById = async (classroomId) => {
  const classroom = await Classroom.findById(classroomId);
  return classroom;
};

export default getOneById;

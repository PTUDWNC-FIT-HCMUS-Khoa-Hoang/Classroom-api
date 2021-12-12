import GradeDetail from '../model';

const getByClassroomId = async (classroomId) => {
  const gradeDetails = await GradeDetail.find({
    classroomId,
  });

  return gradeDetails;
};

export default getByClassroomId;

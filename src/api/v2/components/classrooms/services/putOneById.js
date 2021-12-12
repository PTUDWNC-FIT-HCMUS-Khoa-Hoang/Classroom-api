import Classroom from '../model';

const putOneById = async (classroomId, updateData) => {
  const updatedClassroom = await Classroom.findByIdAndUpdate(
    classroomId,
    updateData,
    {
      new: true,
    }
  );

  return updatedClassroom;
};

export default putOneById;

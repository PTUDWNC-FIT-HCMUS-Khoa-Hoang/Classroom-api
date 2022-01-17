import Classroom from '../model';
import finalizeGrade from './finalizeGrade';

const putOneById = async (updater, classroomId, updateData) => {
  // Check if this is grade finalization
  const keys = Object.keys(updateData);
  if (keys.includes('gradeStructure')) {
    await finalizeGrade(classroomId, updateData.gradeStructure, updater);
  }

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

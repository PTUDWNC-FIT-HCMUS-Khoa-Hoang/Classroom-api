import notificationServices from '../../notifications/services';
import userServices from '../../users/services';
import Classroom from '../model';

const finalizeGrade = async (classroomId, newGradeStructure, user) => {
  const oldClassroom = await Classroom.findById(classroomId);
  const oldGradeStructure = oldClassroom.gradeStructure;
  const { studentList } = oldClassroom;

  // find finalized grades
  let finalizedGrades = [];
  if (Array.isArray(newGradeStructure)) {
    finalizedGrades = newGradeStructure.map((newGrade) => {
      const oldGrade = oldGradeStructure.find(
        (grade) => grade._id.toString() === newGrade._id
      );
      if (!oldGrade?.isFinalized && newGrade?.isFinalized) {
        return newGrade;
      }
    });
  }

  // notify to each student in this classroom
  await Promise.all(
    finalizedGrades.map(async (grade) => {
      if (Array.isArray(studentList)) {
        await Promise.all(
          studentList.map(async (student) => {
            try {
              // get user mapped to this student id
              const studentUser = await userServices.getOneByStudentId(
                student.studentId
              );
              // create a notification
              await notificationServices.notify({
                subjectId: user.id,
                observerId: studentUser._id,
                objectId: classroomId,
                objectName: 'classrooms',
                message: `The '${grade.title}' grade column has just been finalized in class '${oldClassroom.title}'.`,
              });
            } catch (error) {
              console.log('Error in finalize grade service: ', error.message);
            }
          })
        );
      }
    })
  );
};

export default finalizeGrade;

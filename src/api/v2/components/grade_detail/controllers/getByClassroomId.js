import ROLES from '../../../constants/role';
import checkRole from '../../classrooms/helpers/checkRole';
import Classroom from '../../classrooms/model';
import userServices from '../../users/services';
import userClassroomServices from '../../user_classroom/services';
import gradeDetailServices from '../services';

const getByClassroomId = async (req, res) => {
  const classroomId = req.params.classroomId;

  try {
    await checkRole({
      userId: req.user.id,
      classroomId: classroomId,
      roles: [ROLES.OWNER, ROLES.TEACHER, ROLES.STUDENT],
    });

    const classroom = await Classroom.findById(classroomId);

    const rawGradeDetails = await gradeDetailServices.getByClassroomId(
      classroomId
    );

    const gradeBoard = gradeDetailServices.fulfillGradeBoard(
      classroom,
      rawGradeDetails
    );

    // if user is a student, then only show his/her gradeStructured
    const user = await userServices.getOneByUserId(req.user.id);
    const userClassroom = await userClassroomServices.getOne({
      userId: req.user.id,
      classroomId,
    });
    if (userClassroom && userClassroom.role === ROLES.STUDENT) {
      const gradeBoardFilteredByStudentId = gradeBoard.filter(
        (grade) => grade.studentId === user.studentId
      );
      const studentViewGradeBoard = gradeBoardFilteredByStudentId
        .map((grade) => {
          const gradeColumn = classroom.gradeStructure.find(
            (gradeColumn) =>
              gradeColumn._id.toString() === grade.gradeId.toString()
          );
          if (gradeColumn.isFinalized) {
            return grade;
          }
        })
        .filter((notNull) => notNull);

      return res.status(200).send(studentViewGradeBoard);
    }

    res.status(200).send(gradeBoard);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getByClassroomId;

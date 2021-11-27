import Classroom from '../components/classrooms/model';
import UserClassroom from '../components/user_classroom/model';
import ROLES from '../constants/role';

const checkRoleMiddleware =
  (...roles) =>
  async (req, res, next) => {
    const { classroomId } = req.body;
    const userId = req.user.id;
    const NOT_FOUND_CLASSROOM_MESSAGE =
      'Lớp học này không tồn tại hoặc bạn không có quyền thực hiện thao tác với lớp học';
    try {
      if (roles.includes(ROLES.OWNER)) {
        const ownedClassroom = await Classroom.findOne({
          _id: classroomId,
          owner: userId,
        });
        if (!ownedClassroom) {
          throw new Error(NOT_FOUND_CLASSROOM_MESSAGE);
        }
      }
      if (roles.includes(ROLES.TEACHER)) {
        const ownedClassroom = await Classroom.findOne({
          _id: classroomId,
          owner: userId,
        });
        const teacherClassroom = await UserClassroom.findOne({
          userId,
          classroomId,
          role: ROLES.teacher,
        });
        const classroom = ownedClassroom || teacherClassroom;
        if (!classroom) {
          throw new Error(NOT_FOUND_CLASSROOM_MESSAGE);
        }
      }
      if (roles.includes(ROLES.STUDENT)) {
        const studentClassroom = await UserClassroom.findOne({
          userId,
          classroomId,
          role: ROLES.STUDENT,
        });
        if (!studentClassroom) {
          throw new Error(NOT_FOUND_CLASSROOM_MESSAGE);
        }
      }
      next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  };

export default checkRoleMiddleware;

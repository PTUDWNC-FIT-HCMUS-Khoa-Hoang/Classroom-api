import Classroom from '../model';
import UserClassroom from '../../user_classroom/model';
import ROLES from '../../../constants/role';

const checkRole = async ({ userId, classroomId, roles = [] }) => {
  const NOT_FOUND_CLASSROOM_MESSAGE =
    'Lớp học này không tồn tại hoặc bạn không có quyền thực hiện thao tác với lớp học';
  try {
    const ownedClassroom = await Classroom.findOne({
      _id: classroomId,
      owner: userId,
    });
    if (roles.includes(ROLES.OWNER)) {
      if (!ownedClassroom) {
        throw new Error(NOT_FOUND_CLASSROOM_MESSAGE);
      }
    }
    if (roles.includes(ROLES.TEACHER)) {
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
      const classroom = ownedClassroom || studentClassroom;
      if (!classroom) {
        throw new Error(NOT_FOUND_CLASSROOM_MESSAGE);
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default checkRole;

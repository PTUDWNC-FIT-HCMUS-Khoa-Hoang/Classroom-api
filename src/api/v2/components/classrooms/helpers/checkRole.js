import Classroom from '../model';
import UserClassroom from '../../user_classroom/model';
import ROLES from '../../../constants/role';

const checkRole = async ({ userId, classroomId, roles = [] }) => {
  const NOT_FOUND_CLASSROOM_MESSAGE =
    'Lớp học này không tồn tại hoặc bạn không có quyền thực hiện thao tác với lớp học';

  const toCheckClassrooms = [];
  try {
    // gather all posible roles
    const ownedClassroom = await Classroom.findOne({
      _id: classroomId,
      owner: userId,
    });
    if (roles.includes(ROLES.OWNER)) {
      toCheckClassrooms.push(ownedClassroom);
    }
    if (roles.includes(ROLES.TEACHER)) {
      const teacherClassroom = await UserClassroom.findOne({
        userId,
        classroomId,
        role: ROLES.TEACHER,
      });
      toCheckClassrooms.push(ownedClassroom);
      toCheckClassrooms.push(teacherClassroom);
    }
    if (roles.includes(ROLES.STUDENT)) {
      const studentClassroom = await UserClassroom.findOne({
        userId,
        classroomId,
        role: ROLES.STUDENT,
      });
      toCheckClassrooms.push(ownedClassroom);
      toCheckClassrooms.push(studentClassroom);
    }
    // then check
    let flag = false;
    toCheckClassrooms.forEach((participation) => {
      if (participation) {
        flag = true;
      }
    });
    if (!flag) {
      throw new Error(NOT_FOUND_CLASSROOM_MESSAGE);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default checkRole;

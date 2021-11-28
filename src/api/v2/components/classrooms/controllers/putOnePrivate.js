import Classroom from '../model';
import checkRole from '../helpers/checkRole';
import ROLES from '../../../constants/role';

const putOnePrivate = async (req, res) => {
  const classroomId = req.params.id;
  const userId = req.user.id;
  try {
    await checkRole({
      userId,
      classroomId,
      roles: [ROLES.TEACHER],
    });
    const updatedClassroom = await Classroom.findByIdAndUpdate(
      classroomId,
      req.body,
      { new: true }
    );
    res.status(200).send(updatedClassroom);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default putOnePrivate;

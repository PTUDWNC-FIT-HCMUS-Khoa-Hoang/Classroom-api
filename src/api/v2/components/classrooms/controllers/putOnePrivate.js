import ROLES from '../../../constants/role';
import checkRole from '../helpers/checkRole';
import classroomServices from '../services';

const putOnePrivate = async (req, res) => {
  const classroomId = req.params.id;
  const userId = req.user.id;
  try {
    await checkRole({
      userId,
      classroomId,
      roles: [ROLES.TEACHER],
    });
    const updatedClassroom = await classroomServices.putOneById(
      req.user,
      classroomId,
      req.body
    );
    res.status(200).send(updatedClassroom);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default putOnePrivate;

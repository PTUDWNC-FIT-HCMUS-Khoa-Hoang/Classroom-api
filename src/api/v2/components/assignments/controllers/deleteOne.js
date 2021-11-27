import Assignment from '../model';
import checkRole from '../../classrooms/helpers/checkRole';
import ROLES from '../../../constants/role';

const deleteOne = async (req, res) => {
  const assignmentId = req.params.id;
  const userId = req.user.id;
  try {
    const { classroomId } = await Assignment.findById(assignmentId);
    await checkRole({
      userId,
      classroomId,
      roles: [ROLES.TEACHER],
    });
    const deletedAssignment = await Assignment.findByIdAndDelete(assignmentId);
    res.status(200).send(deletedAssignment);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default deleteOne;

import ROLES from '../../../constants/role';
import checkRole from '../../classrooms/helpers/checkRole';
import Assignment from '../model';

const putOne = async (req, res) => {
  const assignmentId = req.params.id;
  const { title, grade } = req.body;
  const userId = req.user.id;
  try {
    // Check role
    const { classroomId } = await Assignment.findById(assignmentId);
    await checkRole({
      userId,
      classroomId,
      roles: [ROLES.TEACHER],
    });
    // Update assignment
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      {
        title,
        grade,
      },
      {
        new: true,
      }
    );
    res.status(200).send(updatedAssignment);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default putOne;

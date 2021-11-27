import ROLES from '../../../constants/role';
import checkRole from '../../classrooms/helpers/checkRole';
import Assignment from '../model';

const postOne = async (req, res) => {
  const { title, grade, classroomId, displayOrder } = req.body;
  const userId = req.user.id;
  try {
    // Check role
    await checkRole({
      userId,
      classroomId,
      roles: [ROLES.TEACHER],
    });
    // Create assignment
    const assignment = new Assignment({
      title,
      grade,
      classroomId,
      displayOrder,
    });
    await assignment.save();
    res.status(201).send(assignment);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default postOne;

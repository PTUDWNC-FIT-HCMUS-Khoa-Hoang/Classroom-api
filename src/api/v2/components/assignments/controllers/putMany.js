import ROLES from '../../../constants/role';
import checkRole from '../../classrooms/helpers/checkRole';
import Assignment from '../model';

const putMany = async (req, res) => {
  const { assignments } = req.body;
  const userId = req.user.id;
  const allowedUpdateFields = ['title', 'grade', 'displayOrder'];
  try {
    let updatedAssignments = [];
    await Promise.all(
      assignments.map(async (assignment) => {
        // Check role
        const { classroomId } = await Assignment.findById(assignment._id);
        await checkRole({
          userId,
          classroomId,
          roles: [ROLES.TEACHER],
        });
        // Update assignment
        let updateObject = {};
        Object.keys(assignment).map((field) => {
          if (allowedUpdateFields.includes(field) && assignment[field]) {
            updateObject[field] = assignment[field];
          }
        });
        const updatedAssignment = await Assignment.findByIdAndUpdate(
          assignment._id,
          updateObject,
          {
            new: true,
          }
        );
        updatedAssignments.push(updatedAssignment);
      })
    );

    res.status(200).send(updatedAssignments);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default putMany;

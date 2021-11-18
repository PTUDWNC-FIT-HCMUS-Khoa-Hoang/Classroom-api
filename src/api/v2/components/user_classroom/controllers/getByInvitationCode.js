import Classroom from '../../classrooms/model';
import UserClassroom from '../model';
import ROLES from '../constants/roles';

const getByInvitationCode = async (req, res) => {
  const { invitationCode } = req.params;
  const userId = req.user.id;
  try {
    const classroom = await Classroom.findOne({ invitationCode });
    if (!classroom) {
      throw new Error('Invalid invitation code!');
    }
    //   Check if this user has been enrolled to the classroom
    const ownedClassroom = await Classroom.findOne({
      _id: classroom._id,
      owner: userId,
    });
    const existedUserClassroom = await UserClassroom.findOne({
      userId,
      classroomId: classroom._id,
    });
    if (ownedClassroom || existedUserClassroom) {
      throw new Error('You have joined this classroom');
    }
    //   Create new user_classroom
    const userClassroom = new UserClassroom({
      userId,
      classroomId: classroom._id,
      role: ROLES.student,
    });
    await userClassroom.save();
    res.status(200).send({
      message: 'Successfully joined classroom',
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getByInvitationCode;

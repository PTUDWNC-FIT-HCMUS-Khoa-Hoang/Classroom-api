import Invitation from '../model';
import UserClassroom from '../../user_classroom/model';
import User from '../../users/model';

const getAcceptClassroom = async (req, res) => {
  const { invitationId } = req.params;
  const userId = req.user.id;
  try {
    // find user email first
    const user = await User.findById(userId);
    // verify invitation
    const invitation = await Invitation.findOne({
      _id: invitationId,
      userEmail: user.email,
    });
    if (!invitation) {
      throw new Error('Not found!');
    }
    const userClassroom = new UserClassroom({
      userId,
      classroomId: invitation.classroomId,
      role: invitation.role,
    });
    await userClassroom.save();
    await Invitation.findByIdAndDelete(invitationId);
    res.status(200).send({
      message: 'Successfully joined classroom',
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getAcceptClassroom;

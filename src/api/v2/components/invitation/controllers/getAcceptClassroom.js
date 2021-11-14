import Invitation from '../model';
import UserClassroom from '../../user_classroom/model';

const getAcceptClassroom = async (req, res) => {
  const { invitationId } = req.params;
  const userId = req.user.id;
  try {
    const invitation = await Invitation.findOne({
      _id: invitationId,
      userId,
    });
    if (!invitation) {
      throw new Error('Not found!');
    }
    const userClassroom = new UserClassroom({
      userId: invitation.userId,
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

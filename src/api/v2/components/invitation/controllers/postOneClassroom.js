import Invitation from '../model';
import Classroom from '../../classrooms/model';
import UserClassroom from '../../user_classroom/model';
import User from '../../users/model';
import ROLES from '../../../constants/role';
import sendMailByGmail from '../../mails/services/gmail';

const postOneClassroom = async (req, res) => {
  const userId = req.user.id;
  const { classroomId, userEmail, role } = req.body;
  try {
    // Check if this user has joined the classroom or not
    const invitedUser = await User.findOne({ email: userEmail });
    if (invitedUser) {
      const ownedClassroom = await Classroom.findOne({
        _id: classroomId,
        owner: invitedUser._id,
      });
      const existedUserClassroom = await UserClassroom.findOne({
        userId: invitedUser._id,
        classroomId,
        role,
      });
      if (ownedClassroom || existedUserClassroom) {
        throw new Error('You have joined this classroom');
      }
    }

    if (role === ROLES.teacher) {
      // Check if this one is the owner
      const ownedClassroom = await Classroom.findOne({
        owner: userId,
        _id: classroomId,
      });
      const teachingClassroom = await UserClassroom.findOne({
        userId,
        classroomId,
        role: ROLES.teacher,
      });
      const classroom = ownedClassroom || teachingClassroom;
      if (!classroom) {
        throw new Error(
          'You are not either the owner nor teacher of this classroom'
        );
      }
    }
    // Create invitation
    const classroomInvitation = new Invitation({
      userEmail,
      classroomId,
      role,
    });
    await classroomInvitation.save();
    // Send mail
    const classroom = await Classroom.findById(classroomId);
    const invitationUrl = `${process.env.FRONTEND_HOST}/join/${classroom._id}?invitation=${classroomInvitation._id}`;
    const html = `
      <h1>Classroom Invitation</h1>
      <p>You have an invitation to join a classroom: "${classroom.title}" by <strong>${req.user.email}</strong></p>
      <a href="${invitationUrl}">Join now</a>
    `;
    const info = await sendMailByGmail({
      receiverEmail: userEmail,
      subject: 'Classroom invitation',
      html,
    });
    // Response
    res.status(201).send({
      acceptUrl:
        req.protocol +
        '://' +
        req.headers.host +
        req.baseUrl +
        '/classroom/accept/' +
        classroomInvitation._id,
      message: 'Email has been sent',
      info,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default postOneClassroom;

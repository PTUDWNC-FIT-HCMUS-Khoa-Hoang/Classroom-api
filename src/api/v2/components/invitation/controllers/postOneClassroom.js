import Invitation from '../model';
import Classroom from '../../classrooms/model';

const postOneClassroom = async (req, res) => {
  const userId = req.user.id;
  const { classroomId, userEmail } = req.body;
  try {
    // Check if this one is the owner
    const classroom = await Classroom.findOne({
      owner: userId,
      _id: classroomId,
    });
    if (!classroom) {
      throw new Error('You are not the owner of this classroom');
    }
    // Create invitation
    const classroomInvitation = new Invitation({
      userEmail,
      classroomId,
      role: 'teacher',
    });
    await classroomInvitation.save();
    res.status(201).send({
      acceptUrl:
        req.protocol +
        '://' +
        req.headers.host +
        req.baseUrl +
        '/classroom/accept/' +
        classroomInvitation._id,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default postOneClassroom;

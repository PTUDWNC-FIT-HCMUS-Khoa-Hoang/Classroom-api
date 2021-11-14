import Invitation from '../model';

const postOneClassroom = async (req, res) => {
  const userId = req.user.id;
  const { classroomId, role } = req.body;
  try {
    const classroomInvitation = new Invitation({
      userId,
      classroomId,
      role: role || 'teacher',
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

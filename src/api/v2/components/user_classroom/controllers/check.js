import Classroom from '../../classrooms/model';
import UserClassroom from '../model';

const check = async (req, res) => {
  const { classroomId } = req.params;
  const userId = req.user.id;
  try {
    const userClassroom = await UserClassroom.findOne({
      userId,
      classroomId,
    });
    const ownedClassroom = await Classroom.findOne({
      _id: classroomId,
      owner: userId,
    });
    const classroom = userClassroom || ownedClassroom;
    const targetClassroom = await Classroom.findById(classroomId);
    if (!classroom) {
      if (!targetClassroom) {
        throw new Error('Classroom not found!');
      }
      return res.status(400).send({
        message: 'Not joined this classroom',
        classroom: {
          title: targetClassroom.title,
        },
      });
    }

    res.status(200).send(classroom);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default check;

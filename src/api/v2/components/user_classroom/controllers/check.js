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
    const ownedClassroom = await Classroom.findOne({ owner: userId });
    if (!userClassroom && !ownedClassroom) {
      throw new Error('Not found!');
    }

    res.status(200).send();
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default check;

import UserClassroom from '../../user_classroom/model';
import Classroom from '../model';

const getAllRelated = async (req, res) => {
  const userId = req.user.id;
  try {
    // Participated classrooms
    const userClassrooms = await UserClassroom.find({
      userId,
    });
    const participatedClassrooms = await Promise.all(
      userClassrooms.map(async (userClassroom) => {
        const classroom = await Classroom.findById(userClassroom.classroomId)
          .populate({ path: 'owner' })
          .populate({ path: 'assignments' });
        return classroom;
      })
    );

    // Owned classrooms
    const ownedClassrooms = await Classroom.find({ owner: userId })
      .populate({ path: 'owner' })
      .populate({ path: 'assignments' });
    res.status(200).send([...ownedClassrooms, ...participatedClassrooms]);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getAllRelated;

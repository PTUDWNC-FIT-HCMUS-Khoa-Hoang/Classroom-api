import UserClassroom from '../../user_classroom/model';
import Classroom from '../model';

const getAllRelated = async (req, res) => {
  const userId = req.user.id;
  try {
    // Participated classrooms
    const participatedClassroomIds = await UserClassroom.find({
      userId,
    }).populate({
      path: 'classroomId',
    });
    const participatedClassrooms = participatedClassroomIds.map(
      (userClassroom) => userClassroom.classroomId
    );

    // Owned classrooms
    const ownedClassrooms = await Classroom.find({ owner: userId });
    res.status(200).send([ownedClassrooms, ...participatedClassrooms]);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getAllRelated;

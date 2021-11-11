import Classroom from '../model';
import UserClassroom from '../../user_classroom/model';
import User from '../../users/model';

const getOnePrivate = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    //   Check if this user has relationship with this classroom
    const ownedClassroom = await Classroom.findOne({ owner: userId, _id: id });
    const participatedClassroom = await UserClassroom.findOne({
      userId,
      classroomId: id,
    });

    if (!ownedClassroom && !participatedClassroom) {
      throw new Error('Classroom not found!');
    }

    const classroom = ownedClassroom || participatedClassroom;
    // find all participants
    const userClassrooms = await UserClassroom.find({ classroomId: id });
    const participantIds = userClassrooms.map(
      (userClassroom) => userClassroom.userId
    );
    const participants = await Promise.all(
      participantIds.map(async (pId) => {
        const user = await User.findById(pId);
        return user;
      })
    );

    res.status(200).send({
      classroom,
      participants,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getOnePrivate;

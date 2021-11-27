import Classroom from '../../classrooms/model';
import UserClassroom from '../model';
import ROLES from '../../../constants/role';

const getByInvitationCode = async (req, res) => {
  const responseObject = {
    message: '',
    classroomId: '',
  };
  const { invitationCode } = req.params;
  const userId = req.user.id;
  try {
    const classroom = await Classroom.findOne({ invitationCode });
    if (!classroom) {
      throw new Error('Invalid invitation code!');
    }
    responseObject.classroomId = classroom._id;
    //   Check if this user has been enrolled to the classroom
    const ownedClassroom = await Classroom.findOne({
      _id: classroom._id,
      owner: userId,
    });
    const existedUserClassroom = await UserClassroom.findOne({
      userId,
      classroomId: classroom._id,
    });
    if (ownedClassroom || existedUserClassroom) {
      responseObject.message = 'You have already joined this classroom';
    } else {
      //   Create new user_classroom
      const userClassroom = new UserClassroom({
        userId,
        classroomId: classroom._id,
        role: ROLES.student,
      });
      await userClassroom.save();
      responseObject.message = 'Successfully joined classroom';
    }

    res.status(200).send(responseObject);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getByInvitationCode;

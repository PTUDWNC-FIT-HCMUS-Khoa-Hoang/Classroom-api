import generateUUID from '../../../helpers/generateUUID';
import Classroom from '../model';
import validateClassroom from '../validations';

const postOne = async (req, res) => {
  const userId = req.user.id;
  try {
    // Validating
    // const isDataValidate = validateClassroom(req.body);
    // Create invitation code
    const classroomWithInvitationCodes = await Classroom.find(
      {},
      'invitationCode'
    );
    const existedInvitationCodes = classroomWithInvitationCodes.map(
      (classroom) => classroom.invitationCode
    );
    let invitationCode = '';
    do {
      invitationCode = generateUUID(7);
    } while (existedInvitationCodes.includes(invitationCode));
    // let invitationCode;
    // do {
    //   invitationCode = generateUUID(7);
    //   const foundCode = await Classroom.findOne({ invitationCode });
    // } while (foundCode);
    // Add owner
    const preCreateClassroom = {
      ...req.body,
      owner: userId,
      invitationCode,
    };
    // Create new classroom document
    const classroom = new Classroom(preCreateClassroom);
    await classroom.save();
    res.status(201).send(classroom);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default postOne;

import Classroom from '../model';
import validateClassroom from '../validations';

const postOne = async (req, res) => {
  const userId = req.user.id;
  try {
    // Validating
    const isDataValidate = validateClassroom(req.body);
    // Add owner
    const preCreateClassroom = {
      ...req.body,
      owner: userId,
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

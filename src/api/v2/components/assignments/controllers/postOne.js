import Assignment from '../model';

const postOne = async (req, res) => {
  const { title, grade, classroomId } = req.body;
  try {
    // Create assignment
    const assignment = new Assignment({
      title,
      grade,
      classroomId,
    });
    await assignment.save();
    res.status(201).send(assignment);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default postOne;

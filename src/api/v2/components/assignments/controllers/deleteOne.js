import Assignment from '../model';

const deleteOne = async (req, res) => {
  const assignmentId = req.params.id;
  try {
    const deletedAssignment = await Assignment.findByIdAndDelete(assignmentId);
    res.status(200).send(deletedAssignment);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default deleteOne;

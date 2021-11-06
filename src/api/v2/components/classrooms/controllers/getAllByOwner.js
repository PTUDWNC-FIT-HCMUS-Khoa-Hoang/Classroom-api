import Classroom from '../model';

const getAllByOwner = async (req, res) => {
  const userId = req.user.id;
  try {
    const ownedClassrooms = await Classroom.find({ owner: userId });
    res.status(200).send(ownedClassrooms);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getAllByOwner;

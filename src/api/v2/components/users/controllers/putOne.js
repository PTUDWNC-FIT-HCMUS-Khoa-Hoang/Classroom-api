import User from '../model';

const putOne = async (req, res) => {
  const userId = req.user.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.send(updatedUser);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default putOne;

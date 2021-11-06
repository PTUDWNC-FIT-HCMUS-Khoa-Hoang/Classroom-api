import User from '../model';

const getOneById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('Not found');
    }
    res.status(200).send({
      fullname: user.fullname,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getOneById;

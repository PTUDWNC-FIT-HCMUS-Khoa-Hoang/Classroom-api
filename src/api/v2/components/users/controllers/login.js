import User from '../model';
import bcrypt from 'bcrypt';
import parseErrorIntoMessage from '../../../helpers/parseErrorIntoMessage';

const NOT_FOUND_USER_ERROR_MESSAGE = 'Email or password is incorrect!';

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFoundByEmail = await User.findOne({ email });
    if (!userFoundByEmail) {
      throw new Error(NOT_FOUND_USER_ERROR_MESSAGE);
    }
    const isPasswordValid = bcrypt.compareSync(
      password,
      userFoundByEmail.password
    );
    if (!isPasswordValid) {
      throw new Error(NOT_FOUND_USER_ERROR_MESSAGE);
    }
    const token = userFoundByEmail.generateToken();
    res.status(200).send({
      user: userFoundByEmail,
      token,
    });
  } catch (error) {
    res.status(400).send(parseErrorIntoMessage(error));
  }
};

export default login;

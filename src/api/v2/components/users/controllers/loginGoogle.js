import User from '../model';
import parseErrorIntoMessage from '../../../helpers/parseErrorIntoMessage';
import googleAccountVerification from '../helpers/googleAccountVerification';

const NOT_FOUND_USER_ERROR_MESSAGE = 'Invalid google account information!';

const loginGoogle = async (req, res) => {
  const { tokenId } = req.body;
  try {
    if (!tokenId) {
      throw new Error('Invalid information');
    }
    const googleAccountInformation = await googleAccountVerification(tokenId);
    const { email, sub: googleId } = googleAccountInformation;

    const userFoundByGoogleId = await User.findOne({ googleId });
    const userFoundByEmail = await User.findOne({ email });
    if (!userFoundByGoogleId) {
      if (userFoundByEmail) {
        throw new Error(
          `This account's email has not been linked with Google. Please login by your email`
        );
      }
      throw new Error(NOT_FOUND_USER_ERROR_MESSAGE);
    }

    const token = userFoundByGoogleId.generateToken();
    res.status(200).send({
      user: userFoundByGoogleId,
      token,
    });
  } catch (error) {
    res.status(400).send(parseErrorIntoMessage(error));
  }
};

export default loginGoogle;

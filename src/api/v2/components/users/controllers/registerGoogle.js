import User from '../model';
import parseErrorIntoMessage from '../../../helpers/parseErrorIntoMessage';
import googleAccountVerification from '../helpers/googleAccountVerification';
import generateUUID from '../../../helpers/generateUUID';

const registerGoogle = async (req, res) => {
  const { tokenId } = req.body;
  try {
    if (!tokenId) {
      throw new Error('Invalid information');
    }
    const googleAccountInformation = await googleAccountVerification(tokenId);
    const { email, sub: googleId, name: fullname } = googleAccountInformation;
    const password = generateUUID(32);
    const userFoundByEmail = await User.findOne({ email });
    if (userFoundByEmail) {
      throw new Error('Existed email');
    }
    const user = new User({
      email,
      password,
      fullname,
      googleId,
    });
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(400).send(parseErrorIntoMessage(error));
  }
};

export default registerGoogle;

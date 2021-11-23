import User from '../model';
import parseErrorIntoMessage from '../../../helpers/parseErrorIntoMessage';
import googleAccountVerification from '../helpers/googleAccountVerification';
import generateUUID from '../../../helpers/generateUUID';

const loginGoogle = async (req, res) => {
  const { tokenId } = req.body;
  try {
    if (!tokenId) {
      throw new Error('Thông tin đăng nhập không hợp lệ');
    }
    const googleAccountInformation = await googleAccountVerification(tokenId);
    const { email, sub: googleId, name: fullname } = googleAccountInformation;

    let user;

    const userFoundByGoogleId = await User.findOne({ googleId });
    const userFoundByEmail = await User.findOne({ email });
    if (!userFoundByGoogleId) {
      if (userFoundByEmail) {
        throw new Error(
          `Tài khoản với email này chưa được liên kết với Google. Vui lòng đăng nhập bằng email.`
        );
      } else {
        const password = generateUUID(32);
        const newUser = new User({
          email,
          password,
          fullname,
          googleId,
        });
        const savedUser = await newUser.save();
        user = savedUser;
      }
    } else {
      user = userFoundByGoogleId;
    }

    const token = user.generateToken();
    res.status(200).send({
      user,
      token,
    });
  } catch (error) {
    res.status(400).send(parseErrorIntoMessage(error));
  }
};

export default loginGoogle;

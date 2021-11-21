import User from '../model';
import bcrypt from 'bcrypt';

const CURRENT_PASSWORD_NOT_MATCHED_ERROR = 'Current password is not matched';

const putOne = async (req, res) => {
  const userId = req.user.id;
  const { studentId, currentPassword } = req.body;
  try {
    if (studentId) {
      const student = await User.findOne({ studentId });
      if (student) {
        throw new Error('Existed student ID!');
      }
    }

    // Check current password
    if (!currentPassword) {
      throw new Error(CURRENT_PASSWORD_NOT_MATCHED_ERROR);
    }
    const userFoundById = await User.findById(userId);
    const isPasswordValid = bcrypt.compareSync(
      currentPassword,
      userFoundById.password
    );
    if (!isPasswordValid) {
      throw new Error(CURRENT_PASSWORD_NOT_MATCHED_ERROR);
    }
    // Update user
    const user = await User.findById(userId);
    user.fullname = req.body.fullname;
    user.password = req.body.password || user.password;
    user.studentId = req.body.studentId;
    const updatedUser = await user.save();
    res.send(updatedUser);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default putOne;

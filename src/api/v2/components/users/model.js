import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  studentId: {
    type: String,
    index: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  secretOtp: {
    type: String,
  },
  googleId: {
    type: String,
  },
});

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.secretOtp;
  delete userObject.googleId;
  return userObject;
};

userSchema.methods.generateToken = function () {
  const user = this;
  const token = jwt.sign(
    {
      data: {
        id: user._id.toString(),
        email: user.email,
        isVerified: user.isVerified,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
  next();
});

const User = mongoose.model('User', userSchema);
export default User;

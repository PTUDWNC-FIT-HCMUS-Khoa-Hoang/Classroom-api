import User from '../model';

const getOneByUserId = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

export default getOneByUserId;

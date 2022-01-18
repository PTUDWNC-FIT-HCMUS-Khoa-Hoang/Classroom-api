import UserClassroom from '../model';

const getOne = async (conditions) => {
  const userClassrooms = await UserClassroom.findOne(conditions);

  return userClassrooms;
};

export default getOne;

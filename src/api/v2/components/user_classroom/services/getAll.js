import UserClassroom from '../model';

const getAll = async (conditions) => {
  const userClassrooms = await UserClassroom.find(conditions);

  return userClassrooms;
};

export default getAll;

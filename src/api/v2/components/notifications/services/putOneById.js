import Notification from '../model';

const putOneById = async (id, data) => {
  const notification = await Notification.findByIdAndUpdate(id, data, {
    new: true,
  });
  return notification;
};

export default putOneById;

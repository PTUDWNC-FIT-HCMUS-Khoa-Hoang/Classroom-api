import Notification from '../model';

const getByObserverId = async (observerId) => {
  const notifications = await Notification.find({
    observerId,
  });

  return notifications;
};

export default getByObserverId;

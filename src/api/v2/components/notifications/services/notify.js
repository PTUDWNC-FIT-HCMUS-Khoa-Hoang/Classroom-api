import Notification from '../model';

const notify = async ({
  subjectId,
  observerId,
  objectId,
  objectName,
  message,
}) => {
  const notification = new Notification({
    subjectId,
    observerId,
    objectName,
    objectId,
    message,
  });

  await notification.save();
  return notification;
};

export default notify;

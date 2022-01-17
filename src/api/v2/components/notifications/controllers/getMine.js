import notificationServices from '../services';

const getMine = async (req, res) => {
  const userId = req.user.id;

  try {
    const notifications = await notificationServices.getByObserverId(userId);

    res.status(200).send(notifications);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getMine;

import notificationServices from '../services';

const putOneById = async (req, res) => {
  const notificationId = req.params.id;
  try {
    const updatedNotification = await notificationServices.putOneById(
      notificationId,
      req.body
    );
    res.status(200).send(updatedNotification);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default putOneById;

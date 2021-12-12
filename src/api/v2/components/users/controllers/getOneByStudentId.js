import userServices from '../services';

const getOneByStudentId = async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const student = await userServices.getOneByStudentId(studentId);

    res.status(200).send(student);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getOneByStudentId;

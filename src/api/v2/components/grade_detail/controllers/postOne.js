import gradeDetailServices from '../services';
import ROLES from '../../../constants/role';
import checkRole from '../../classrooms/helpers/checkRole';

const postOne = async (req, res) => {
  try {
    const gradeDetailData = req.body;

    await checkRole({
      userId: req.user.id,
      classroomId: gradeDetailData.classroomId,
      roles: [ROLES.OWNER],
    });

    const gradeDetail = await gradeDetailServices.postOne(gradeDetailData);

    res.status(201).send(gradeDetail);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default postOne;

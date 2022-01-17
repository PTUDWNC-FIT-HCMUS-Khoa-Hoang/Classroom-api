import GradeDetail from '../model';

const getOneById = async (id) => {
  const gradeDetail = await GradeDetail.findById(id);
  return gradeDetail;
};

export default getOneById;

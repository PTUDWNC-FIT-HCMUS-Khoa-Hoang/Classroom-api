import GradeReview from '../model';

const getOne = async (conditions) => {
  const gradeReviews = await GradeReview.findOne(conditions);

  return gradeReviews;
};

export default getOne;

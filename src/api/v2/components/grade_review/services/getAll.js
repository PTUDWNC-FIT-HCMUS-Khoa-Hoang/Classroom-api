import GradeReview from '../model';

const getAll = async (conditions) => {
  const gradeReviews = await GradeReview.find(conditions);

  return gradeReviews;
};

export default getAll;

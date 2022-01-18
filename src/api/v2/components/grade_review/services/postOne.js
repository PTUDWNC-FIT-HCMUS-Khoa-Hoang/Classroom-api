import GradeReview from '../model';

const postOne = async (data) => {
  // create new grade review
  const gradeReview = new GradeReview(data);

  await gradeReview.save();
  return gradeReview;
};

export default postOne;

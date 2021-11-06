import validateGradings from './gradings';

const validateClassroom = (classroom) => {
  const isGradingsValidate = validateGradings(classroom.gradings);

  return isGradingsValidate;
};

export default validateClassroom;

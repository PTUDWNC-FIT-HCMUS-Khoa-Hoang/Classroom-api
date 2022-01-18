import yup from 'yup';

const update = yup
  .object()
  .shape({
    teacherComment: yup.string(),
    isFinalDecision: yup.boolean(),
    upgradedGrade: yup.number(),
  })
  .noUnknown(true);

export default update;

const validateGradings = (
  gradings = [
    {
      title: '',
      ratio: 1,
    },
  ]
) => {
  // console.log('🚀 ~ file: gradings.js ~ line 10 ~ gradings', gradings);
  const totalRatio =
    gradings.length === 1
      ? gradings[0].ratio
      : gradings.reduce(
          (prev, curr) => parseFloat(prev?.ratio) + parseFloat(curr?.ratio)
        );
  // console.log('🚀 ~ file: gradings.js ~ line 11 ~ totalRatio', totalRatio);

  if (totalRatio !== 1) {
    throw new Error(`Total of gradings' ratios is not 100%`);
  }
  return true;
};

export default validateGradings;

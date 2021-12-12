const checkGradeId = (classroom, gradeId) => {
  const checkGradeId =
    classroom.gradeStructure.findIndex(
      (grade) => grade._id.toString() === gradeId
    ) > -1;
  if (!checkGradeId) {
    throw new Error('Không tồn tại mục điểm này trong lớp học');
  }
};

export default checkGradeId;

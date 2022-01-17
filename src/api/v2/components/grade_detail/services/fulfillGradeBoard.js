const fulfillGradeBoard = (classroom, gradeDetails) => {
  const gradeIds = classroom.gradeStructure.map((detail) => detail._id);
  const studentIds = classroom.studentList.map((student) => student.studentId);

  const fulfilledGradeBoard = [];

  studentIds.forEach((studentId) => {
    gradeIds.forEach((gradeId) => {
      const detail = gradeDetails.find((detail) => {
        return (
          detail.studentId === studentId &&
          detail.gradeId.toString() === gradeId.toString()
        );
      });
      fulfilledGradeBoard.push({
        _id: detail?._id || '',
        classroomId: classroom._id,
        studentId,
        gradeId,
        grade: detail?.grade || null,
      });
    });
  });

  return fulfilledGradeBoard;
};

export default fulfillGradeBoard;

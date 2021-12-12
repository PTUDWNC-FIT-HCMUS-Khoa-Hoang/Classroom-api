import User from '../../users/model';

const getOneByStudentId = async (studentId) => {
  const student = await User.findOne({
    studentId,
  });

  if (!student) {
    throw new Error(
      `Không tìm thấy tài khoản nào tương ứng với mã số sinh viên ${studentId}`
    );
  }

  return student;
};

export default getOneByStudentId;

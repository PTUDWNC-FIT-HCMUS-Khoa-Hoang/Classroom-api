import Classroom from '../model';

const mergeStudentList = async (classroomId, toMergeStudentList = []) => {
  const classroom = await Classroom.findById(classroomId);

  const { studentList } = classroom;

  toMergeStudentList.forEach((student) => {
    const foundStudent = studentList.find(
      (s) => s.studentId === student.studentId
    );
    if (!foundStudent) {
      studentList.push(student);
    }
  });

  return studentList;
};

export default mergeStudentList;

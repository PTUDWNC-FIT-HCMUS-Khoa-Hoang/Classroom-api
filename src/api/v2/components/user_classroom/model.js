import mongoose from 'mongoose';
import ROLES from '../../constants/role';

const userClassroomSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  classroomId: {
    type: mongoose.Types.ObjectId,
    ref: 'Classroom',
    required: true,
  },
  role: {
    type: String,
    enum: Object.keys(ROLES).map((role) => role.toLowerCase()),
    default: ROLES.STUDENT,
  },
});

const UserClassroom = mongoose.model('UserClassroom', userClassroomSchema);
export default UserClassroom;

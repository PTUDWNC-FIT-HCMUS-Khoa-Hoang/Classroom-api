import express from 'express';
import authMiddleware from '../../middlewares/auth';
import userClassroomControllers from './controllers';
const joinClassroomRoutes = express.Router();

// ======================== GET ========================
joinClassroomRoutes.get(
  '/check/:classroomId',
  authMiddleware,
  userClassroomControllers.check
);
joinClassroomRoutes.get(
  '/code/:invitationCode',
  authMiddleware,
  userClassroomControllers.getByInvitationCode
);
// ======================== POST ========================
// ======================== PUT ========================
// ======================== DELETE ========================

export default joinClassroomRoutes;

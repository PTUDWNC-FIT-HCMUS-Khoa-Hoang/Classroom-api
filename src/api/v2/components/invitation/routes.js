import express from 'express';
import authMiddleware from '../../middlewares/auth';
import invitationControllers from './controllers';
const invitationRoutes = express.Router();

// ======================== GET ========================
invitationRoutes.get(
  '/classroom/accept/:invitationId',
  authMiddleware,
  invitationControllers.getAcceptClassroom
);
// ======================== POST ========================
invitationRoutes.post(
  '/classroom',
  authMiddleware,
  invitationControllers.postOneClassroom
);
// ======================== PUT ========================
// ======================== DELETE ========================

export default invitationRoutes;

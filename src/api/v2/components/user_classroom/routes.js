import express from 'express';
import authMiddleware from '../../middlewares/auth';
import userClassroomControllers from './controllers';
const joinClassroomRoutes = express.Router();

// ======================== GET ========================
joinClassroomRoutes.get(
  '/check/:id',
  authMiddleware,
  userClassroomControllers.check
);
// ======================== POST ========================
// ======================== PUT ========================
// ======================== DELETE ========================

export default joinClassroomRoutes;

import express from 'express';
import authMiddleware from '../../middlewares/auth';
import checkRoleMiddleware from '../../middlewares/checkRole';
import assignmentControllers from './controllers';
import ROLES from '../../constants/role';
const assignmentRoutes = express.Router();

// ======================== GET ========================
// ======================== POST ========================
assignmentRoutes.post(
  '/',
  authMiddleware,
  checkRoleMiddleware(ROLES.TEACHER),
  assignmentControllers.postOne
);
// ======================== PUT ========================
// ======================== DELETE ========================

export default assignmentRoutes;

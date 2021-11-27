import express from 'express';
import authMiddleware from '../../middlewares/auth';
import assignmentControllers from './controllers';
const assignmentRoutes = express.Router();

// ======================== GET ========================
// ======================== POST ========================
assignmentRoutes.post('/', authMiddleware, assignmentControllers.postOne);
// ======================== PUT ========================
// ======================== DELETE ========================
assignmentRoutes.delete(
  '/:id',
  authMiddleware,
  assignmentControllers.deleteOne
);

export default assignmentRoutes;

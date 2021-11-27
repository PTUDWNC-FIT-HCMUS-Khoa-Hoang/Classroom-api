import express from 'express';
import authMiddleware from '../../middlewares/auth';
import assignmentControllers from './controllers';
const assignmentRoutes = express.Router();

// ======================== GET ========================
// ======================== POST ========================
assignmentRoutes.post('/', authMiddleware, assignmentControllers.postOne);
// ======================== PUT ========================
assignmentRoutes.put('/', authMiddleware, assignmentControllers.putMany);
assignmentRoutes.put('/:id', authMiddleware, assignmentControllers.putOne);
// ======================== DELETE ========================
assignmentRoutes.delete(
  '/:id',
  authMiddleware,
  assignmentControllers.deleteOne
);

export default assignmentRoutes;

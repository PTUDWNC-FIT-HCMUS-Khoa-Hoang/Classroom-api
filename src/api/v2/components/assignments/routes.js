import express from 'express';
import authMiddleware from '../../middlewares/auth';
import assignmentControllers from './controllers';
const assignmentRoutes = express.Router();

// ======================== GET ========================
// ======================== POST ========================
assignmentRoutes.post('/', authMiddleware, assignmentControllers.postOne);
// ======================== PUT ========================
// ======================== DELETE ========================

export default assignmentRoutes;

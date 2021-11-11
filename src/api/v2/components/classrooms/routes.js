import express from 'express';
import authMiddleware from '../../middlewares/auth';
import classroomControllers from './controllers';
const classroomRoutes = express.Router();

// ======================== GET ========================
classroomRoutes.get(
  '/owned',
  authMiddleware,
  classroomControllers.getAllByOwner
);
classroomRoutes.get('/:id', authMiddleware, classroomControllers.getOnePrivate);
// ======================== POST ========================
classroomRoutes.post('/', authMiddleware, classroomControllers.postOne);
// ======================== PUT ========================
// ======================== DELETE ========================

export default classroomRoutes;

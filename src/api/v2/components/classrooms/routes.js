import express from 'express';
import authMiddleware from '../../middlewares/auth';
import classroomControllers from './controllers';
const classroomRoutes = express.Router();

// ======================== GET ========================
classroomRoutes.get('/', authMiddleware, classroomControllers.getAllRelated);
classroomRoutes.get('/:id', authMiddleware, classroomControllers.getOnePrivate);
// ======================== POST ========================
classroomRoutes.post('/', authMiddleware, classroomControllers.postOne);
// ======================== PUT ========================
// ======================== DELETE ========================

export default classroomRoutes;

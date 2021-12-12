import express from 'express';
import authMiddleware from '../../middlewares/auth';
import classroomControllers from './controllers';
import classroomMiddlewares from './middlewares';
const classroomRouter = express.Router();

// ======================== GET ========================
classroomRouter.get('/', authMiddleware, classroomControllers.getAllRelated);
classroomRouter.get('/:id', authMiddleware, classroomControllers.getOnePrivate);
classroomRouter.get(
  '/student-list/csv/:classroomId',
  classroomControllers.getStudentListCsvTemplate
);
// ======================== POST ========================
classroomRouter.post('/', authMiddleware, classroomControllers.postOne);
// ======================== PUT ========================
classroomRouter.put('/:id', authMiddleware, classroomControllers.putOnePrivate);
classroomRouter.put(
  '/student-list/csv/:classroomId',
  authMiddleware,
  classroomMiddlewares.uploadCsvFile,
  classroomControllers.putStudentListByCsv
);
// ======================== DELETE ========================

export default classroomRouter;

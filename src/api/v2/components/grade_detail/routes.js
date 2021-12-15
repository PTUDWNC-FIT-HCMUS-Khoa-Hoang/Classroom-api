import express from 'express';
import authMiddleware from '../../middlewares/auth';
import gradeDetailMiddlewares from './middlewares';
import gradeDetailControllers from './controllers';

const gradeDetailRouter = express.Router();

// ======================== GET ========================
gradeDetailRouter.get(
  '/:classroomId',
  authMiddleware,
  gradeDetailControllers.getByClassroomId
);
gradeDetailRouter.get(
  '/csv/:classroomId',
  authMiddleware,
  gradeDetailControllers.getCsvDataByClassroomId
);
gradeDetailRouter.get(
  '/csv/:classroomId/:gradeId',
  authMiddleware,
  gradeDetailControllers.getCsvDataByGradeId
);
// ======================== POST ========================
gradeDetailRouter.post('/', authMiddleware, gradeDetailControllers.postOne);
gradeDetailRouter.post(
  '/csv/:classroomId/:gradeId',
  authMiddleware,
  gradeDetailMiddlewares.uploadCsvFile,
  gradeDetailControllers.postCsvDataByGradeId
);
// ======================== PUT ========================
// ======================== DELETE ========================

export default gradeDetailRouter;

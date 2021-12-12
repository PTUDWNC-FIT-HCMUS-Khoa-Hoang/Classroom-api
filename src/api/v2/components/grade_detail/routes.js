import express from 'express';
import authMiddleware from '../../middlewares/auth';
import gradeDetailMiddlewares from './middlewares';
import gradeDetailControllers from './controllers';

const gradeDetailRouter = express.Router();

// ======================== GET ========================
// gradeDetailRouter.get(
//   '/csv/:classroomId',
//   authMiddleware,
//   gradeDetailControllers.getCsvDataByClassroomId
// );
gradeDetailRouter.get(
  '/csv/:classroomId/:gradeId',
  // authMiddleware,
  gradeDetailControllers.getCsvDataByGradeId
);
// ======================== POST ========================
gradeDetailRouter.post('/', authMiddleware, gradeDetailControllers.postOne);
gradeDetailRouter.post(
  '/csv/:classroomId',
  authMiddleware,
  gradeDetailMiddlewares.uploadCsvFile,
  gradeDetailControllers.postByCsv
);
// ======================== PUT ========================
// ======================== DELETE ========================

export default gradeDetailRouter;

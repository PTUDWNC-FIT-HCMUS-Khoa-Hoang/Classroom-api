import express from 'express';
import authMiddleware from '../../middlewares/auth';
import gradeReviewControllers from './controllers';

const gradeReviewRoutes = express.Router();

// ======================== GET ========================
gradeReviewRoutes.get(
  '/by-classroom-id/:classroomId',
  authMiddleware,
  gradeReviewControllers.getAllByClassroomId
);
gradeReviewRoutes.get(
  '/:id',
  authMiddleware,
  gradeReviewControllers.getOneById
);
// ======================== POST ========================
gradeReviewRoutes.post('/', authMiddleware, gradeReviewControllers.postOne);
// ======================== PUT ========================
// ======================== DELETE ========================

export default gradeReviewRoutes;

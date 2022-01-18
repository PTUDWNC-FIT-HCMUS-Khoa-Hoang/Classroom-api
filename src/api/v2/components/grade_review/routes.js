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
gradeReviewRoutes.put(
  '/:id',
  authMiddleware,
  gradeReviewControllers.putOneById
);
// ======================== DELETE ========================

export default gradeReviewRoutes;

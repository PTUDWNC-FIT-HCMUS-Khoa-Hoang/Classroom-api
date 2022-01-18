import express from 'express';
import authMiddleware from '../../middlewares/auth';
import gradeReviewControllers from './controllers';

const gradeReviewRoutes = express.Router();

// ======================== GET ========================
// ======================== POST ========================
gradeReviewRoutes.post('/', authMiddleware, gradeReviewControllers.postOne);
// ======================== PUT ========================
// ======================== DELETE ========================

export default gradeReviewRoutes;

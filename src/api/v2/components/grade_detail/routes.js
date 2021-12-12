import express from 'express';
import authMiddleware from '../../middlewares/auth';
import gradeDetailControllers from './controllers';

const gradeDetailRouter = express.Router();

// ======================== GET ========================
// ======================== POST ========================
gradeDetailRouter.post('/', authMiddleware, gradeDetailControllers.postOne);
// ======================== PUT ========================
// ======================== DELETE ========================

export default gradeDetailRouter;

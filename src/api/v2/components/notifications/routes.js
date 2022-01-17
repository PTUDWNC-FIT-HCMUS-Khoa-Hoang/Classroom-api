import express from 'express';
import notificationControllers from './controllers';
import authMiddleware from '../../middlewares/auth';

const notificationRoutes = express.Router();

//======================== GET ========================
notificationRoutes.get(
  '/mine',
  authMiddleware,
  notificationControllers.getMine
);
//======================== POST ========================

//======================== PUT ========================
//======================== DELETE ========================

export default notificationRoutes;

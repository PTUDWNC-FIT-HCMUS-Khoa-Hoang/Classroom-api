import express from 'express';
import userControllers from './controllers';
import authMiddleware from '../../middlewares/auth';

const userRoutes = express.Router();

//======================== GET ========================
userRoutes.get('/other/:id', authMiddleware, userControllers.getOneById);
//======================== POST ========================
userRoutes.post('/register', userControllers.register);
userRoutes.post('/login', userControllers.login);
//======================== PUT ========================
//======================== DELETE ========================

export default userRoutes;

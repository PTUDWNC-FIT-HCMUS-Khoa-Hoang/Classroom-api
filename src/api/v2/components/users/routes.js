import express from 'express';
import userControllers from './controllers';
import authMiddleware from '../../middlewares/auth';

const userRoutes = express.Router();

//======================== GET ========================
userRoutes.get('/other/:id', authMiddleware, userControllers.getOneById);
//======================== POST ========================
userRoutes.post('/register', userControllers.register);
userRoutes.post('/register/google', userControllers.registerGoogle);
userRoutes.post('/login', userControllers.login);
//======================== PUT ========================
userRoutes.put('/me', authMiddleware, userControllers.putOne);
//======================== DELETE ========================

export default userRoutes;

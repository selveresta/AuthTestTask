import express from 'express';
import { UserController } from './user.controller';
import { body } from 'express-validator';
import authHandler from '../../middlewares/auth-middleware';

const userController = new UserController();
const userRouter = express.Router();

userRouter.post('/registration', body('email').isEmail(), body('password').isLength({ min: 3, max: 32 }), userController.registration);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.post('/changeboss', authHandler, userController.changeBoss);
userRouter.get('/refresh', userController.refresh);
userRouter.get('/users', authHandler, userController.getUsers);

export default userRouter;

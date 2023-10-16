import express from 'express';
import userRouter from '../modules/user/user.router';
const router = express.Router();

router.use('/api', userRouter);

export default router;

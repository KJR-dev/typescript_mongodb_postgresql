import { Router } from 'express';
import apiRouter from './apiRouter';
import userRouter from './userRouter';

const router = Router();

router.use('/', apiRouter);
router.use('/user', userRouter);

export default router;


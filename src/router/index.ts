import { Router } from 'express';
import apiRouter from './apiRouter';
import userRouter from './userRouter';
import newsRouter from './newsRouter';
import news2Router from './news2Router';

const router = Router();

router.use('/', apiRouter);
router.use('/user', userRouter);
router.use('/news', newsRouter);
router.use('/news2',news2Router)

export default router;


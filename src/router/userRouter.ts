import { Router } from 'express';
import rateLimit from '../middleware/rateLimit';
import { UserController } from '../controllers/UserController';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';
import { UserService } from '../services/UserService';

const userRouter = Router();

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.post('/register', rateLimit(1), (req, res,next) => userController.register(req, res,next));

export default userRouter;


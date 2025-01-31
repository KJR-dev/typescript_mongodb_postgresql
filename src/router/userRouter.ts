import { Router, Request, Response, NextFunction } from 'express';
import rateLimit from '../middleware/rateLimit';
import { UserController } from '../controllers/UserController';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';
import { UserService } from '../services/UserService';
import logger from '../util/logger';
import userSchema from '../validators/userSchema';
import { userValidate } from '../middleware/userValidate';

const userRouter = Router();

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService, logger);

userRouter.post('/register', userSchema, userValidate, rateLimit(1), (req: Request, res: Response, next: NextFunction) =>
    userController.register(req, res, next)
);

export default userRouter;


import { Router, Request, Response, NextFunction } from 'express';
import rateLimit from '../middleware/rateLimit';
import { UserController } from '../controllers/AuthController';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';
import { UserService } from '../services/AuthService';
import logger from '../util/logger';
import userSchema from '../validators/userSchema';
import { TokenService } from '../services/TokenService';
import { RefreshToken } from '../entity/RefreshToken';
// import { userValidate } from '../middleware/userValidate';

const userRouter = Router();

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
const tokenService = new TokenService(refreshTokenRepository);
const userController = new UserController(userService, logger, tokenService);

userRouter.post('/register', userSchema, rateLimit(1), (req: Request, res: Response, next: NextFunction) => userController.register(req, res, next));

export default userRouter;


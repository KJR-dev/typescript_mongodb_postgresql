import { NextFunction, Response } from 'express';
import { RegisterUserRequest } from '../types/userTypes';
import { UserService } from '../services/UserService';
import httpResponse from '../util/httpResponse';
import responseMessage from '../constant/responseMessage';
import httpError from '../util/httpError';
import { Logger } from 'winston';
// import { validationResult } from 'express-validator';

export class UserController {
    constructor(
        private userService: UserService,
        private logger: Logger
    ) {}
    async register(req: RegisterUserRequest, res: Response, next: NextFunction) {
        try {
            const { firstName, lastName, email, password, role } = req.body;
            this.logger.debug('User payload: ', { firstName, lastName, email, password, role });
            const newUser = await this.userService.create({ firstName, lastName, email, password, role });
            this.logger.info('User create successful', newUser);
            return httpResponse(req, res, 200, responseMessage.REGISTER_USER_SUCCESSFUL, newUser);
        } catch (error) {
            this.logger.error('User create unsuccessful', error);
            httpError(next, error, req, 500);
            return;
        }
    }
}


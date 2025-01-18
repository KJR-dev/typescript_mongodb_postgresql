import { NextFunction, Response } from 'express';
import { RegisterUserRequest } from '../types/userTypes';
import { UserService } from '../services/UserService';
import httpError from '../util/httpError';
import httpResponse from '../util/httpResponse';
import responseMessage from '../constant/responseMessage';

export class UserController {
    constructor(private userService: UserService) {}
    async register(req: RegisterUserRequest, res: Response, next: NextFunction) {
        const { firstName, lastName, email, password } = req.body;
        try {
            const newUser = await this.userService.create({ firstName, lastName, email, password });
            return httpResponse(req, res, 200, responseMessage.REGISTER_USER_SUCCESSFUL, newUser);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    }
}


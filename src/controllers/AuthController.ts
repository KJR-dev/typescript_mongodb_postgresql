import { NextFunction, Response } from 'express';
import { RegisterUserRequest } from '../types/userTypes';
import { UserService } from '../services/AuthService';
import httpResponse from '../util/httpResponse';
import responseMessage from '../constant/responseMessage';
import httpError from '../util/httpError';
import { Logger } from 'winston';
import { validationResult } from 'express-validator';
import { JwtPayload } from 'jsonwebtoken';
import { TokenService } from '../services/TokenService';

export class UserController {
    constructor(
        private userService: UserService,
        private logger: Logger,
        private tokenService: TokenService
    ) {}
    async register(req: RegisterUserRequest, res: Response, next: NextFunction) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            httpError(next, result.array(), req, 400);
            return;
        }
        const { firstName, lastName, email, password, role } = req.body;
        this.logger.debug('User payload: ', { firstName, lastName, email, password, role });
        try {
            const newUser = await this.userService.create({ firstName, lastName, email, password, role });

            this.logger.info('User create successful', newUser);

            const payload: JwtPayload = {
                sub: String(newUser.id),
                role: newUser.role
            };

            //Access token generate
            const accessToken = this.tokenService.generateAccessToken(payload);
            //Persist the refresh token
            const newRefreshToken = await this.tokenService.persistRefreshToken(newUser);
            //Refresh token generate
            const refreshToken = this.tokenService.generateRefreshToken({ ...payload, id: String(newRefreshToken.id) });
            res.cookie('accessToken', accessToken, {
                domain: 'localhost',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60,
                httpOnly: true
            });

            res.cookie('refreshToken', refreshToken, {
                domain: 'localhost',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true
            });

            return httpResponse(req, res, 200, responseMessage.REGISTER_USER_SUCCESSFUL, newUser);
        } catch (error) {
            this.logger.error('User create unsuccessful', error);
            httpError(next, error, req, 500);
            return;
        }
    }
}


import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import httpError from '../util/httpError';

export const userValidate = (req: Request, _res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(httpError(next, errors.array(), req, 400));
    }
    next();
};

import { NextFunction } from 'express';
import { THttpError } from '../types/httpTypes';
import { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: THttpError, _req: Request, res: Response, _: NextFunction) => {
    res.status(err.statusCode).json(err);
};

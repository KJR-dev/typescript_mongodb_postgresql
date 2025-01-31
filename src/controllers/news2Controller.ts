import { CreateNews2Request } from '../types/news2Types';
import { Response, NextFunction } from 'express';
import httpResponse from '../util/httpResponse';
import responseMessage from '../constant/responseMessage';
import { News2Service } from '../services/News2Service';

export class News2Controller {
    constructor(private news2Service: News2Service) {}
    async create(req: CreateNews2Request, res: Response, next: NextFunction) {
        const { authorName, title, content, articles, date } = req.body;
        try {
            const result = await this.news2Service.create({ authorName, title, content, articles, date });
            return httpResponse(req, res, 200, responseMessage.REGISTER_USER_SUCCESSFUL, result);
        } catch (error) {
            next(error);
            return;
        }
    }
}


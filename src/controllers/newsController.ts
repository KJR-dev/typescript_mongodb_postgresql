import { Response, NextFunction } from 'express';
import httpResponse from '../util/httpResponse';
import responseMessage from '../constant/responseMessage';
import { CreateNewsRequest } from '../types/newsTypes';
import { NewsServices } from '../services/NewsServices';

export class NewsController {
    constructor(private newsService: NewsServices) {}
    async create(req: CreateNewsRequest, res: Response, next: NextFunction) {
        const { authorName, title, content, articles, date } = req.body;
        try {
            const newNews = await this.newsService.create({ authorName, title, content, articles, date })
            return httpResponse(req, res, 200, responseMessage.REGISTER_USER_SUCCESSFUL, newNews);
        } catch (error) {
            next(error);
            return;
        }
    }
}


import { Request } from 'express';

export interface NewsDataInterface {
    authorName: string;
    title: string;
    content: string;
    articles: string;
    date: string;
}

export interface CreateNewsRequest extends Request {
    body: NewsDataInterface;
}

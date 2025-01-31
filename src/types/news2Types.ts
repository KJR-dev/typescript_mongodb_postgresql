import { Request } from 'express';

export interface News2DataInterface {
    authorName: string;
    title: string;
    content: string;
    articles: string;
    date: string;
}

export interface CreateNews2Request extends Request {
    body: News2DataInterface;
}


import { Repository } from 'typeorm';
import { News } from '../entity/News';
import { NewsDataInterface } from '../types/newsTypes';

export class NewsServices {
    constructor(private newsRepository: Repository<News>) {}
    async create({ authorName, title, content, articles, date }: NewsDataInterface): Promise<void> {
        try {
            await this.newsRepository.save({ authorName, title, content, articles, date });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating news: ${error.message}`);
            } else {
                throw new Error('Unknown error occurred while creating news');
            }
        }
    }
}


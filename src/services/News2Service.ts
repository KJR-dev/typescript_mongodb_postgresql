import { Repository } from 'typeorm';
import { News2 } from '../entity/News2';
import { News2DataInterface } from '../types/news2Types';

export class News2Service {
    constructor(private news2Repository: Repository<News2>) {}
    async create({ authorName, title, content, articles, date }: News2DataInterface) {
        try {
            await this.news2Repository.save({ authorName, title, content, articles, date });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating news: ${error.message}`);
            } else {
                throw new Error('Unknown error occurred while creating news');
            }
        }
    }
}


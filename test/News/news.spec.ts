import request from 'supertest';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../src/config/data-source';
import { News } from '../../src/entity/News';
import { truncateTables } from '../utils';
import app from '../../src/app';

describe('News /api/v1/news', () => {
    let connection: DataSource;
    beforeAll(async () => {
        connection = await AppDataSource.initialize();
        await truncateTables(connection);
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('Create News', async () => {
        //Arrenge
        const NewsData = {
            authorName: 'Jitendra Sahoo',
            title: 'xyz',
            content: '<p>Hello</p>',
            articles: 'Latest article',
            date: '25th Aug 2025'
        };
        //Action
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        await request(app).post('/api/v1/news').send(NewsData);

        //Assert
        const newsRepository = AppDataSource.getRepository(News);
        const news = await newsRepository.find();
        expect(news).toHaveLength(1);
        expect(news[0].authorName).toEqual('Jitendra Sahoo')
        expect(news[0].title).toEqual('xyz')
        expect(news[0].content).toEqual('<p>Hello</p>')
        expect(news[0].articles).toEqual('Latest article')
        expect(news[0].date).toEqual('25th Aug 2025')
    });
});


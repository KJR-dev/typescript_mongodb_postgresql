import request from 'supertest';
import app from '../../src/app';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../src/config/data-source';
import { News2 } from '../../src/entity/News2';
import { truncateTables } from '../utils';

describe('News2 api/v1/news2', () => {
    let connection: DataSource;
    beforeAll(async () => {
        connection = await AppDataSource.initialize();
        await truncateTables(connection);
    });

    afterAll(async () => {
        await connection.destroy();
    });
    it('News2 should be create', async () => {
        const News2Data = {
            authorName: 'Jitendra sahoo',
            title: 'xyz',
            content: '<p>hello</p>',
            articles: 'Latest article',
            date: '25th Jan 2025'
        };

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        await request(app).post('/api/v1/news2').send(News2Data);

        const news2Repository = AppDataSource.getRepository(News2);
        const news2 = await news2Repository.find();
        expect(news2).toHaveLength(1);
        expect(news2[0].authorName).toEqual('Jitendra sahoo');
        expect(news2[0].title).toEqual('xyz');
        expect(news2[0].content).toEqual('<p>hello</p>');
        expect(news2[0].articles).toEqual('Latest article');
        expect(news2[0].date).toEqual('25th Jan 2025');
    });
});


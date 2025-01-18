import request from 'supertest';
import app from '../../src/app';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../src/config/data-source';
import { User } from '../../src/entity/User';
import { truncateTables } from '../utils';

describe('POST /user/register', () => {
    let connection: DataSource;
    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });
    beforeEach(async () => {
        await truncateTables(connection);
    });
    afterAll(async () => {
        await connection.destroy();
    });
    it('should register a new user', async () => {
        // Arrange
        const userData = {
            firstName: 'jitu',
            lastName: 'sahoo',
            email: 'abc@gmail.com',
            password: 1234
        };

        // Act
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        await request(app).post('/api/v1/user/register').send(userData);

        // Assert
        const userRepository = connection.getRepository(User);
        const user = await userRepository.find();
        expect(user).toHaveLength(1);
    });
});


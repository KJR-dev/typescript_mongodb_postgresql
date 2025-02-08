import request from 'supertest';
import app from '../../src/app';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../src/config/data-source';
import { User } from '../../src/entity/User';
import { Roles } from '../../src/constant';
import { isJwt } from '../utils';
import { RefreshToken } from '../../src/entity/RefreshToken';
import { THttpResponse } from '../../src/types/httpTypes';
import { userRegisterResponseData } from '../../src/types/userTypes';

describe('POST /user/register', () => {
    let connection: DataSource;
    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });
    beforeEach(async () => {
        await connection.dropDatabase();
        await connection.synchronize();
    });
    afterAll(async () => {
        await connection.destroy();
    });
    describe('Given all fields', () => {
        it('should register a new user', async () => {
            // Arrange
            const userData = {
                firstName: 'jitu',
                lastName: 'sahoo',
                email: 'johndoe@gmail.com',
                password: '1234',
                role: Roles.CUSTOMER
            };

            // Act
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            await request(app).post('/api/v1/user/register').send(userData);

            // Assert
            const userRepository = connection.getRepository(User);
            const user = await userRepository.find();
            expect(user).toHaveLength(1);
        });
        it('should assign a custom role', async () => {
            // Arrange
            const userData = {
                firstName: 'jitu',
                lastName: 'sahoo',
                email: 'abc@gmail.com',
                password: '1234',
                role: Roles.CUSTOMER
            };

            // Act
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            await request(app).post('/api/v1/user/register').send(userData);

            // Assert
            const userRepository = connection.getRepository(User);
            const user = await userRepository.find();
            expect(user).toHaveLength(1);
            expect(user[0]).toHaveProperty('role');
            expect(user[0].role).toBe(Roles.CUSTOMER);
        });
        it('Should store the hashed password in database', async () => {
            //Arrenge
            const userData = {
                firstName: 'Jitendra',
                lastName: 'Sahoo',
                email: 'abc@gmail.com',
                password: '1234',
                role: Roles.CUSTOMER
            };

            //Action
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            await request(app).post('/api/v1/user/register').send(userData);

            //Assert
            const userRepository = connection.getRepository(User);
            const user = await userRepository.find();
            expect(user).toHaveLength(1);
            expect(user[0].password).not.toBe(userData.password);
            expect(user[0].password).toHaveLength(60);
            expect(user[0].password).toMatch(/^\$2b\$/);
        });
        it('Should return access token and refresh token inside a cookie', async () => {
            //Arrenge
            const userData = {
                firstName: 'Jitendra',
                lastName: 'Sahoo',
                email: 'sahooj168@gmail.com',
                password: '1234',
                role: Roles.CUSTOMER
            };
            //Act
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            const response = await request(app).post('/api/v1/user/register').send(userData);

            // console.log(response)

            //Assert
            interface Headers {
                ['set-cookie']: string[];
            }
            const cookies = (response.headers as unknown as Headers)['set-cookie'] || [];
            let accessToken: string | null = null;
            let refreshToken: string | null = null;
            cookies.forEach((cookie) => {
                if (cookie.startsWith('accessToken=')) {
                    accessToken = cookie.split(';')[0].split('=')[1];
                }
                if (cookie.startsWith('refreshToken=')) {
                    refreshToken = cookie.split(';')[0].split('=')[1];
                }
            });

            expect(response.status).toBe(200);
            expect(accessToken).not.toBeNull();
            expect(refreshToken).not.toBeNull();

            expect(isJwt(accessToken)).toBeTruthy();
            expect(isJwt(refreshToken)).toBeTruthy();

            // expect(accessToken).toBe('fgshdfgjsgdfsjkdfs');
            // expect(refreshToken).toBe('fghjdagfsdgfksfjskf');

            // // Verify cookie properties
            // const accessTokenCookie = cookies.find((cookie) => cookie.startsWith('accessToken='));
            // const refreshTokenCookie = cookies.find((cookie) => cookie.startsWith('refreshToken='));

            // expect(accessTokenCookie).toMatch(/HttpOnly/);
            // expect(accessTokenCookie).toMatch(/Secure/);
            // expect(refreshTokenCookie).toMatch(/HttpOnly/);
            // expect(refreshTokenCookie).toMatch(/Secure/);
        });
        it('should store the refresh token in the database', async () => {
            //Arrenge
            const userData = {
                firstName: 'Jitendra',
                lastName: 'Sahoo',
                email: 'abc@gmail.com',
                password: 'password'
            };

            //Act
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            const response = await request(app).post('/api/v1/user/register').send(userData);

            //Assert
            const refreshTokenRepo = AppDataSource.getRepository(RefreshToken);
            // Define the response type to match the expected structure

            // Use the generic type for strong typing
            const userId = (response.body as THttpResponse<userRegisterResponseData>).data.id;

            const tokens = await refreshTokenRepo.createQueryBuilder('refreshToken').where('refreshToken.userId = :userId', { userId }).getMany();

            expect(tokens).toHaveLength(1);
        });
    });
    describe('Fields are missing', () => {
        it('should retun 400 status code', async () => {
            const userData = {
                firstName: 'Jitendra',
                lastName: 'Sahoo',
                email: '',
                password: '1234'
            };

            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            const response = await request(app).post('/api/v1/user/register').send(userData);

            expect(response.statusCode).toBe(400);
            // const userRepository = AppDataSource.getRepository(User);
            // await userRepository.save({ ...userData, role: Roles.CUSTOMER });
        });
    });

    describe('Field are not proper format', () => {
        it('Should trim the email field', async () => {
            //Arrenge
            const userData = {
                firstName: 'Jitendra',
                lastName: 'Sahoo',
                email: ' abc12@gmail.com ',
                password: '1234'
            };

            //Action
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            const response = await request(app).post('/api/v1/user/register').send(userData);

            //Assert
            expect(response.status).toBe(200);
            const userRepository = AppDataSource.getRepository(User);
            const users = await userRepository.find();
            expect(users.length).toBe(1); // Ensure user is created
            expect(users[0].email).toBe('abc12@gmail.com');
        });
    });
});


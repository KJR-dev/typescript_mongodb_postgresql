import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import Config from './config';
import { News } from '../entity/News';
import { News2 } from '../entity/News2';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: Config.POSTGRESQL_HOST,
    port: Config.POSTGRESQL_PORT,
    username: Config.POSTGRESQL_USERNAME,
    password: Config.POSTGRESQL_PASSWORD,
    database: Config.POSTGRESQL_DATABASE,
    // synchronize: Config.ENV === 'test' || Config.ENV === 'development',
    synchronize: false,
    // logging: Config.ENV === 'test' || Config.ENV === 'development',
    logging: false,
    entities: [User, News, News2],
    migrations: ['src/migration/*.ts'],
    subscribers: []
});


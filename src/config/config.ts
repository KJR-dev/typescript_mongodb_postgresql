import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();

export default {
    // General
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,

    // MongoDB Database
    MONGODB_DATABASE_URL: process.env.MONGODB_DATABASE_URL,

    // PostgreSQL Database
    POSTGRESQL_HOST: process.env.POSTGRESQL_HOST,
    POSTGRESQL_PORT: Number(process.env.POSTGRESQL_PORT),
    POSTGRESQL_USERNAME: process.env.POSTGRESQL_USERNAME,
    POSTGRESQL_PASSWORD: process.env.POSTGRESQL_PASSWORD,
    POSTGRESQL_DATABASE: process.env.POSTGRESQL_DATABASE,
    SECRETE_KEY: process.env.REFRESH_TOKEN_SECRETE
};

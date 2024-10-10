import dotenvFlow from 'dotenv-flow'
dotenvFlow.config()

export default {
    //General
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,

    //Database
    MONGODB_DATABASE_URL: process.env.MONGODB_DATABASE_URL
}


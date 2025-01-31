import app from './app';
import Config from './config/config';
import { initRateLimiter } from './config/rateLimter';
import mongoDatabaseService from './services/mongoDatabaseService';
import logger from './util/logger';

const server = app.listen(Config.PORT);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
    try {
        //Database Conntion
        const connection = await mongoDatabaseService.connect();
        logger.info('DATABASE_NAME', {
            meta: {
                CONNECTION_NAME: connection.name
            }
        });

        initRateLimiter(connection);
        logger.info('RATE_LIMITER_INITIAED');

        logger.info(`APPLICATION_STARTD`, {
            meta: {
                PORT: Config.PORT,
                SERVER_URL: Config.SERVER_URL
            }
        });
    } catch (error: unknown) {
        logger.info('APPLICATION_ERROR', { meta: error });

        server.close((closeError?: Error) => {
            if (closeError) {
                logger.info('APPLICATION_ERROR', { meta: closeError });
            }
            process.exit(1);
        });
    }
})();


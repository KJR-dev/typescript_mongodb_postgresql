import { Router } from 'express';
import apiController from '../controllers/apiController';
import rateLimit from '../middleware/rateLimit';

const apiRouter = Router();

apiRouter.route('/self').get(rateLimit(1), apiController.self);
apiRouter.route('/health').get(rateLimit(2), apiController.health);
export default apiRouter;


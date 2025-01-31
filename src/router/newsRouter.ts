import { Router } from 'express';
import { NewsController } from '../controllers/newsController';
import { AppDataSource } from '../config/data-source';
import { News } from '../entity/News';
import { NewsServices } from '../services/NewsServices';

const newsRouter = Router();

const newsRepository = AppDataSource.getRepository(News);
const newsService = new NewsServices(newsRepository);
const newsController = new NewsController(newsService);

newsRouter.post('/', (req, res, next) => newsController.create(req, res, next));

export default newsRouter;


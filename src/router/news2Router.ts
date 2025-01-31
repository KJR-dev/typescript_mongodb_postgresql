import { Router } from 'express';
import { News2Controller } from '../controllers/news2Controller';
import { AppDataSource } from '../config/data-source';
import { News2 } from '../entity/News2';
import { News2Service } from '../services/News2Service';

const news2Router = Router();

const news2Repository = AppDataSource.getRepository(News2);
const news2Service = new News2Service(news2Repository);
const news2Controller = new News2Controller(news2Service);

news2Router
    .route('/')
    .post((req, res, next) => news2Controller.create(req, res, next))

export default news2Router;


import { Router } from 'express';
import cityHandler from './city.controller';

const cityRouter = Router();

cityRouter.route('/').get(cityHandler.getAll);

export default cityRouter;

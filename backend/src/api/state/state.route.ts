import { Router } from 'express';
import stateHandler from './state.controller';

const stateRouter = Router();

stateRouter.route('/').get(stateHandler.getAll);

export default stateRouter;

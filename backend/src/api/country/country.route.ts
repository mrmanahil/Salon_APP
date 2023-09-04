import { Router } from 'express';
import countryController from './country.controller';

const countryRouter = Router();

countryRouter.route('/').get(countryController.getAll);

export default countryRouter;

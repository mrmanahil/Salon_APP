import { type Request, type Response, type NextFunction } from 'express';
import { City } from './city.model';
import createSuccessResponse, {
  SuccessResponse,
} from '../../util/createResponse';
import CityHandler from './city.handler';

class CityController {
  static getAll = async (
    req: Request<void, SuccessResponse<City[]>, undefined>,
    res: Response<SuccessResponse<City[]>>,
    next: NextFunction
  ) => {
    try {
      const cities = await CityHandler.getAll();

      res.send(createSuccessResponse(cities || [], 'Fetched Successfully'));
    } catch (error) {
      next(error);
    }

    return next();
  };
}

export default CityController;

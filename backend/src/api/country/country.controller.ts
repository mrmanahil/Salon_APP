import { type Request, type Response, type NextFunction } from 'express';
import { Country } from './country.model';
import createSuccessResponse, {
  SuccessResponse,
} from '../../util/createResponse';
import CountryHandler from './country.handler';

class CountryController {
  static getAll = async (
    req: Request<void, SuccessResponse<Country[]>, undefined>,
    res: Response<SuccessResponse<Country[]>>,
    next: NextFunction
  ) => {
    try {
      const countries = await CountryHandler.getAll();

      res.send(createSuccessResponse(countries || [], 'Fetched Successfully'));
    } catch (error) {
      next(error);
    }

    return next();
  };
}

export default CountryController;

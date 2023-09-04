import { type Request, type Response, type NextFunction } from 'express';
import { State } from './state.model';
import createSuccessResponse, {
  SuccessResponse,
} from '../../util/createResponse';
import StateHandler from './state.handler';

class StateController {
  static getAll = async (
    req: Request<void, SuccessResponse<State[]>, undefined>,
    res: Response<SuccessResponse<State[]>>,
    next: NextFunction
  ) => {
    try {
      const states = await StateHandler.getAll();

      res.send(createSuccessResponse(states || [], 'Fetched Successfully'));
    } catch (error) {
      next(error);
    }

    return next();
  };
}

export default StateController;

import { State } from './state.model';
import StateService from './state.service';

class StateHandler {
  static getAll = async (): Promise<State[] | null> => {
    const states = await StateService.getAll();

    return states;
  };
}

export default StateHandler;

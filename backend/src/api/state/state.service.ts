import { States } from './state.model';

class StateService {
  static getAll = async () => States.findMany();
}

export default StateService;

import { Cities } from './city.model';

class CityService {
  static getAll = async () => Cities.findMany();
}

export default CityService;

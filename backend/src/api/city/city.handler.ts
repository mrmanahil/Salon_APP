import { City } from './city.model';
import CityService from './city.service';

class CityHandler {
  static getAll = async (): Promise<City[] | null> => {
    const cities = await CityService.getAll();

    return cities;
  };
}

export default CityHandler;

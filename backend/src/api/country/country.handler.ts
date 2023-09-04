import { Country } from './country.model';
import CountryService from './country.service';

class CountryHandler {
  static getAll = async (): Promise<Country[] | null> => {
    const countries = await CountryService.getAll();

    return countries;
  };
}

export default CountryHandler;

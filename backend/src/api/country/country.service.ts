import { Countries } from './country.model';

class CountryService {
  static getAll = async () => Countries.findMany();
}

export default CountryService;

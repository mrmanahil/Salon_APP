import { Customer } from './customer.model';
import CustomerService from './customer.service';

class CustomerHandler {
  static getByID = async (customerID: number): Promise<Customer | null> => {
    return CustomerService.getByID(customerID);
  };
}

export default CustomerHandler;

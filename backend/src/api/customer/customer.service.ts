import { Customer, Customers } from './customer.model';

class CustomerService {
  static getByID = (customerID: number): Promise<Customer | null> => {
    return Customers.findFirst({ where: { customerID } });
  };
}

export default CustomerService;

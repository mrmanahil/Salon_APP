/* eslint-disable no-unsafe-finally */
import {
  CreateServiceInput,
  Service,
  UpdateServiceInput,
} from './service.model';
import ServiceService from './service.service';

class ServiceHandler {
  static getAll = async (): Promise<Service[]> => {
    return ServiceService.getAll();
  };

  static getByID = async (serviceID: number): Promise<Service | null> => {
    return ServiceService.getByID(serviceID);
  };

  static create = async (
    service: CreateServiceInput
  ): Promise<Service | undefined> => {
    const validatedService = CreateServiceInput.parse(service);

    if (validatedService) {
      const newService = await ServiceService.create({
        serviceDiscountPrice: validatedService.serviceDiscountPrice,
        serviceDurationInMinutes: validatedService.serviceDurationInMinutes,
        serviceName: validatedService.serviceName,
        servicePrice: validatedService.servicePrice,
        shopID: validatedService.shopID,
        categoryID: +validatedService.categoryID,
      });

      return newService;
    }

    return undefined;
  };

  static update = async (
    service: UpdateServiceInput,
    serviceID: number
  ): Promise<Service | undefined> => {
    const validatedService = UpdateServiceInput.parse(service);

    if (validatedService) {
      const updatedService = await ServiceService.update(
        {
          serviceDiscountPrice: validatedService.serviceDiscountPrice,
          serviceDurationInMinutes: validatedService.serviceDurationInMinutes,
          serviceImageUrl: validatedService.serviceImageUrl,
          serviceName: validatedService.serviceName,
          servicePrice: validatedService.servicePrice,
        },
        serviceID
      );

      return updatedService;
    }

    return undefined;
  };

  static delete = async (serviceID: number): Promise<Service> => {
    return ServiceService.delete(serviceID);
  };
}

export default ServiceHandler;

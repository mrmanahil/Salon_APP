import {
  CreateServiceInput,
  Service,
  Services,
  UpdateServiceInput,
} from './service.model';

class ServiceService {
  static getAll = (): Promise<Service[]> => {
    return Services.findMany();
  };

  static getByID = (serviceID: number): Promise<Service | null> => {
    return Services.findFirst({ where: { serviceID } });
  };

  static create = (service: CreateServiceInput): Promise<Service> => {
    return Services.create({
      data: {
        hasDiscount: service.serviceDiscountPrice > 0,
        serviceDiscountPrice: service.serviceDiscountPrice,
        serviceDurationInMinutes: service.serviceDurationInMinutes,
        serviceImageUrl: '',
        serviceName: service.serviceName,
        servicePrice: service.servicePrice,
        category: {
          connect: { categoryID: service.categoryID },
        },
        shop: {
          connect: { shopID: service.shopID },
        },
      },
    });
  };

  static update = (
    service: UpdateServiceInput,
    serviceID: number
  ): Promise<Service> => {
    return Services.update({
      data: {
        hasDiscount: (service.serviceDiscountPrice || 0) > 0,
        serviceDiscountPrice: service.serviceDiscountPrice,
        serviceDurationInMinutes: service.serviceDurationInMinutes,
        serviceImageUrl: service.serviceImageUrl,
        serviceName: service.serviceName,
        servicePrice: service.servicePrice,
      },
      where: {
        serviceID,
      },
    });
  };

  static delete = (serviceID: number): Promise<Service> => {
    return Services.delete({
      where: {
        serviceID,
      },
    });
  };
}

export default ServiceService;

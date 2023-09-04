import { NextFunction, Request, Response } from 'express';
import { join } from 'path';
import { copyFile, rm } from 'fs/promises';
import createSuccessResponse, {
  SuccessResponse,
} from '../../util/createResponse';
import {
  CreateServiceInput,
  DeleteServiceInputParams,
  GetByIDInput,
  Service,
  UpdateServiceInput,
  UpdateServiceInputParams,
  UploadImageInput,
} from './service.model';
import ErrorResponse from '../../util/createError';
import ServiceHandler from './service.handler';
import CategoryHandler from '../category/category.handler';
import ShopHandler from '../shop/shop.handler';
import { SETUP } from '../../config/setup';

class ServiceController {
  static getAll = async (
    req: Request<void, SuccessResponse<Service[]>>,
    res: Response<SuccessResponse<Service[]>>,
    next: NextFunction
  ) => {
    try {
      const services = await ServiceHandler.getAll();

      res.send(createSuccessResponse(services, 'Services found Successfully'));
    } catch (error) {
      next(error);
    }
  };

  static getByID = async (
    req: Request<GetByIDInput, SuccessResponse<Service>>,
    res: Response<SuccessResponse<Service>>,
    next: NextFunction
  ) => {
    try {
      const { serviceID } = req.params;
      const service = await ServiceHandler.getByID(+serviceID);

      if (service) {
        res.send(createSuccessResponse(service, 'Service found successfully'));
      } else {
        next(
          new ErrorResponse(`Service with the ID ${serviceID} not found`, 400)
        );
      }
    } catch (error) {
      next(error);
    }
  };

  static create = async (
    req: Request<{}, SuccessResponse<Service>, CreateServiceInput>,
    res: Response<SuccessResponse<Service>>,
    next: NextFunction
  ) => {
    try {
      const service = req.body;

      if (service.shopID > 0) {
        const shop = await ShopHandler.getByID(+service.shopID);

        if (!shop) {
          return next(new ErrorResponse(`Shop does not exists`, 400));
        }
      }

      if (service.categoryID > 0) {
        const category = await CategoryHandler.getByID(+service.categoryID);

        if (!category) {
          return next(new ErrorResponse(`Category does not exists`, 400));
        }
      }

      const newService = await ServiceHandler.create({
        serviceDiscountPrice: service.serviceDiscountPrice,
        serviceDurationInMinutes: service.serviceDurationInMinutes,
        serviceName: service.serviceName,
        servicePrice: service.servicePrice,
        shopID: service.shopID,
        categoryID: +service.categoryID,
      });

      if (!newService) {
        return next(
          new ErrorResponse(`Service can not be created, error ocurred`, 400)
        );
      }

      res.send(
        createSuccessResponse(newService, 'Service created successfully')
      );
    } catch (error) {
      next(error);
    }

    return next();
  };

  static update = async (
    req: Request<
      UpdateServiceInputParams,
      SuccessResponse<Service>,
      UpdateServiceInput
    >,
    res: Response<SuccessResponse<Service>>,
    next: NextFunction
  ) => {
    try {
      const service = req.body;
      const updatedService = await ServiceHandler.update(
        {
          serviceDiscountPrice: service.serviceDiscountPrice,
          serviceDurationInMinutes: service.serviceDurationInMinutes,
          serviceImageUrl: service.serviceImageUrl,
          serviceName: service.serviceName,
          servicePrice: service.servicePrice,
        },
        +req.params.serviceID
      );

      if (!updatedService) {
        return next(
          new ErrorResponse(`Service can not be created, error ocurred`, 400)
        );
      }

      res.send(
        createSuccessResponse(updatedService, 'Service updated successfully')
      );
    } catch (error) {
      next(error);
    }

    return next();
  };

  static uploadImage = async (
    req: Request<{}, SuccessResponse<Service>, { serviceID: string }>,
    res: Response<SuccessResponse<Service>>,
    next: NextFunction
  ) => {
    try {
      const validated = UploadImageInput.parse(req.body);

      if (!validated) {
        return null;
      }

      if (!req.file) {
        return next(new ErrorResponse(`File is required`, 400));
      }

      const service = await ServiceHandler.getByID(+req.body.serviceID);

      if (!service) {
        return next(new ErrorResponse(`Service does not exists`, 404));
      }

      const previousImageUrl = service.serviceImageUrl;
      if (previousImageUrl && previousImageUrl !== null) {
        const imageFile = previousImageUrl.split('/');
        const imageFileName = imageFile[imageFile.length - 1];
        const imageFilePath = join(
          __dirname,
          '../../../public/service',
          imageFileName
        );
        const tempImageFilePath = join(
          __dirname,
          '../../../temp',
          imageFileName
        );
        await copyFile(imageFilePath, tempImageFilePath);
        await rm(imageFilePath, { maxRetries: 5 });
      }

      const imageUrl = `${SETUP.API_KEY}/service/${req.file.filename}`;

      const data = await ServiceHandler.update(
        {
          serviceDiscountPrice: service.serviceDiscountPrice,
          serviceDurationInMinutes: service.serviceDurationInMinutes,
          serviceImageUrl: imageUrl,
          serviceName: service.serviceName,
          servicePrice: service.servicePrice,
        },
        +req.body.serviceID
      );

      if (!data) {
        return next(new ErrorResponse(`Service Update was unsuccessful`, 404));
      }

      res.send(
        createSuccessResponse(data, 'Service Image Uploaded successfully')
      );
    } catch (error) {
      next(error);
    }

    return null;
  };

  static delete = async (
    req: Request<DeleteServiceInputParams, SuccessResponse<{}>>,
    res: Response<SuccessResponse<{}>>,
    next: NextFunction
  ) => {
    try {
      const isDeleted = await ServiceHandler.delete(+req.params.serviceID);

      if (isDeleted) {
        res.send(createSuccessResponse({}, 'Service deleted successfully'));
      } else {
        return next(new ErrorResponse(`Service can not be deleted`, 400));
      }
    } catch (error) {
      return next(error);
    }

    return next();
  };
}

export default ServiceController;

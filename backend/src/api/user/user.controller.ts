import { type Request, type Response, type NextFunction } from 'express';
import { join } from 'path';
import { copyFile, rm } from 'fs/promises';
import {
  CreateUserInput,
  LoginUserInput,
  UploadBarberImageInput,
  User,
  UserWithoutAddress,
} from './user.model';
import createSuccessResponse, {
  SuccessResponse,
} from '../../util/createResponse';
import ErrorResponse from '../../util/createError';
import Token from '../../util/jwt';
import config from '../../util/config';
import userActions from './user.handler';
import { Barber } from '../barber/barber.model';
import BarberHandler from '../barber/barber.handler';
import { SETUP } from '../../config/setup';

class UserController {
  static getBarbers = async (
    req: Request,
    res: Response<SuccessResponse<Barber[]>>,
    next: NextFunction
  ) => {
    try {
      const barbers = await BarberHandler.get();

      res.send(
        createSuccessResponse(barbers || [], 'Barbers Created Successfully')
      );
    } catch (error) {
      next(error);
    }
  };

  static create = async (
    req: Request<void, SuccessResponse<User>, CreateUserInput | undefined>,
    res: Response<SuccessResponse<User>>,
    next: NextFunction
  ) => {
    try {
      console.log(req.body);

      const user = CreateUserInput.parse(req.body ?? {});

      const newUser = await userActions.create({
        email: user.email,
        password: user.password,
        userTypeID: user.userTypeID,
        name: user.name,
        address: {
          addressLine1: user.address?.addressLine1 || '',
          addressLine2: user.address?.addressLine2 || '',
          cityID: user.address?.cityID || 1,
          countryID: user.address?.countryID || 1,
          stateID: user.address?.stateID || 1,
        },
      });

      res.send(createSuccessResponse(newUser, 'User Created Successfully'));
    } catch (error) {
      next(error);
    }
  };

  static login = async (
    req: Request<
      void,
      SuccessResponse<UserWithoutAddress>,
      LoginUserInput | undefined
    >,
    res: Response<SuccessResponse<UserWithoutAddress>>,
    next: NextFunction
  ) => {
    try {
      const user = LoginUserInput.parse(req.body ?? {});

      const loggedInUser = await userActions.login(user);

      if (
        !loggedInUser ||
        loggedInUser === null ||
        !loggedInUser.userID ||
        loggedInUser.userID === 0
      ) {
        next(new ErrorResponse('Email or Password is Incorrect', 400));
      }

      const accessToken = Token.getJWTToken(
        { userID: loggedInUser?.userID },
        config.JWT_ACCESS_TOKEN_PRIVATE_KEY,
        '1y'
      );

      userActions.update(req.body.token, loggedInUser?.userID);

      res.cookie('accessToken', accessToken);

      res.send(
        createSuccessResponse(
          loggedInUser as UserWithoutAddress,
          'User Logged in Successfully'
        )
      );
    } catch (error) {
      next(error);
    }

    return next();
  };

  static uploadBarberImage = async (
    req: Request<{}, SuccessResponse<Barber>, UploadBarberImageInput>,
    res: Response<SuccessResponse<Barber>>,
    next: NextFunction
  ) => {
    try {
      const validated = UploadBarberImageInput.parse(req.body);

      if (!validated) {
        return null;
      }

      if (!req.file) {
        return next(new ErrorResponse(`File is required`, 400));
      }

      const barber = await BarberHandler.getByID(+req.body.barberID);

      if (!barber) {
        return next(new ErrorResponse(`Barber does not exists`, 404));
      }

      const previousImageUrl = barber.imageUrl;
      if (previousImageUrl && previousImageUrl !== null) {
        const imageFile = previousImageUrl.split('/');
        const imageFileName = imageFile[imageFile.length - 1];
        const imageFilePath = join(
          __dirname,
          '../../../public/barber',
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

      const imageUrl = `${SETUP.API_KEY}/barber/${req.file.filename}`;

      const data = await BarberHandler.update(
        {
          barberName: barber.barberName,
          imageUrl,
          totalExperienceInYear: barber.totalExperienceInYear,
        },
        +req.body.barberID
      );

      if (!data) {
        return next(new ErrorResponse(`Barber Update was unsuccessful`, 404));
      }

      res.send(
        createSuccessResponse(data, 'Barber Image Uploaded successfully')
      );
    } catch (error) {
      next(error);
    }

    return null;
  };
}

export default UserController;

import { NextFunction, Request, Response } from 'express';
import { Socket } from 'socket.io';
import moment from 'moment';
import createSuccessResponse, {
  SuccessResponse,
} from '../../util/createResponse';
import admin from 'firebase-admin';
import {
  ApproveBooking,
  Booking,
  CreateBooking,
  GetByIDInput,
  GetByUserID,
} from './booking.model';
import BookingHandler from './booking.handler';
import ErrorResponse from '../../util/createError';
import ShopHandler from '../shop/shop.handler';
import ServiceHandler from '../service/service.handler';
import BarberHandler from '../barber/barber.handler';
import CustomerHandler from '../customer/customer.handler';
import { Service } from '../service/service.model';
import { BOOKING_TYPES } from '../../config/setup';
import serviceAccount from '../../../salon-app-935cc-firebase-adminsdk-rvh2u-db2c9f4f69.json' assert { type: 'json' };
import UserHandler from '../user/user.handler';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class BookingController {
  static getAll = async (
    req: Request<GetByUserID, SuccessResponse<Booking[]>>,
    res: Response<SuccessResponse<Booking[]>>,
    next: NextFunction
  ) => {
    try {
      const { userID } = req.params;

      const bookings = await BookingHandler.getAll(userID);

      res.send(createSuccessResponse(bookings, 'Bookings found Successfully'));
    } catch (error) {
      next(error);
    }
  };

  static getByID = async (
    req: Request<GetByIDInput, SuccessResponse<Booking>>,
    res: Response<SuccessResponse<Booking>>,
    next: NextFunction
  ) => {
    try {
      const { bookingID } = req.params;
      const service = await BookingHandler.getByID(+bookingID);

      if (service) {
        res.send(createSuccessResponse(service, 'Booking found successfully'));
      } else {
        next(
          new ErrorResponse(`Booking with the ID ${bookingID} not found`, 400)
        );
      }
    } catch (error) {
      next(error);
    }
  };

  static create = async (
    req: Request<{}, SuccessResponse<Booking>, CreateBooking>,
    res: Response<SuccessResponse<Booking>>,
    next: NextFunction
  ) => {
    try {
      const booking = req.body;
      let service: Service | null = null;

      if (booking.shopID > 0) {
        const shop = await ShopHandler.getByID(+booking.shopID);

        if (!shop) {
          return next(new ErrorResponse(`Shop does not exists`, 400));
        }
      }

      if (booking.serviceID > 0) {
        service = await ServiceHandler.getByID(+booking.serviceID);
        if (!service) {
          return next(new ErrorResponse(`Service does not exists`, 400));
        }
      }

      if (booking.barberID > 0) {
        const barber = await BarberHandler.getByID(+booking.barberID);

        if (!barber) {
          return next(new ErrorResponse(`Barber does not exists`, 400));
        }
      }

      if (booking.customerID > 0) {
        const customer = await CustomerHandler.getByID(+booking.customerID);

        if (!customer) {
          return next(new ErrorResponse(`Customer does not exists`, 400));
        }
      }

      booking.bookingTotalAmount = service.hasDiscount
        ? service.serviceDiscountPrice
        : service.servicePrice;

      const bookingDate = moment(booking.bookingDate, 'DD-MM-YYYY');
      const currDate = moment();

      if (bookingDate.isBefore(currDate)) {
        return next(new ErrorResponse(`Booing Date should be in future`, 400));
      }

      booking.bookingEndTime = moment(booking.bookingStartTime, 'hh:mm:ss A')
        .add(service.serviceDurationInMinutes, 'minutes')
        .format('hh:mm:ss A');

      const newBooking = await BookingHandler.create(booking);

      if (!newBooking) {
        return next(
          new ErrorResponse(`Booking can not be created, error ocurred`, 400)
        );
      }

      // Send Notification to web portal, through socket.io
      const socket = req.app.get('io') as Socket;

      socket.emit('new_booking', newBooking);

      res.send(
        createSuccessResponse(newBooking, 'Booking created successfully')
      );
    } catch (error) {
      next(error);
    }

    return next();
  };

  static approve = async (
    req: Request<{}, SuccessResponse<Booking>, ApproveBooking>,
    res: Response<SuccessResponse<Booking>>,
    next: NextFunction
  ) => {
    try {
      const booking = req.body;
      await ApproveBooking.parseAsync(booking);

      const newBooking = await BookingHandler.update(
        {
          statusID: BOOKING_TYPES.APPROVED,
        },
        +booking.bookingID
      );

      const user = await UserHandler.getUserByID(newBooking?.customerID);

      admin.messaging().send({
        notification: {
          title: 'Order Approved',
          body: 'Your Order is Approved',
        },
        android: {
          priority: 'high',
        },
        token: user.token,
      });

      if (!newBooking) {
        return next(
          new ErrorResponse(`Booking can not be Approved, error ocurred`, 400)
        );
      }

      res.send(
        createSuccessResponse(newBooking, 'Booking Approved successfully')
      );
    } catch (error) {
      next(error);
    }

    return next();
  };

  static complete = async (
    req: Request<{}, SuccessResponse<Booking>, ApproveBooking>,
    res: Response<SuccessResponse<Booking>>,
    next: NextFunction
  ) => {
    try {
      const booking = req.body;
      await ApproveBooking.parseAsync(booking);

      const newBooking = await BookingHandler.update(
        {
          statusID: BOOKING_TYPES.COMPLETED,
        },
        +booking.bookingID
      );

      if (!newBooking) {
        return next(
          new ErrorResponse(`Booking can not be Completed, error ocurred`, 400)
        );
      }

      const user = await UserHandler.getUserByID(newBooking?.customerID);

      admin.messaging().send({
        notification: {
          title: 'Order Completed',
          body: 'Your Order is Completed',
        },
        android: {
          priority: 'high',
        },
        token: user.token,
      });

      res.send(
        createSuccessResponse(newBooking, 'Booking Completed successfully')
      );
    } catch (error) {
      next(error);
    }

    return next();
  };

  static paid = async (
    req: Request<{}, SuccessResponse<Booking>, ApproveBooking>,
    res: Response<SuccessResponse<Booking>>,
    next: NextFunction
  ) => {
    try {
      const booking = req.body;
      await ApproveBooking.parseAsync(booking);

      const newBooking = await BookingHandler.update(
        {
          statusID: BOOKING_TYPES.PAID,
        },
        +booking.bookingID
      );

      if (!newBooking) {
        return next(
          new ErrorResponse(`Booking can not be Paid, error ocurred`, 400)
        );
      }

      const user = await UserHandler.getUserByID(newBooking?.customerID);

      admin.messaging().send({
        notification: {
          title: 'Order Paid',
          body: 'Your Order is Paid',
        },
        android: {
          priority: 'high',
        },
        token: user.token,
      });

      // Send Notification to Customer, through socket.io

      res.send(createSuccessResponse(newBooking, 'Booking Paid successfully'));
    } catch (error) {
      next(error);
    }

    return next();
  };
}

export default BookingController;

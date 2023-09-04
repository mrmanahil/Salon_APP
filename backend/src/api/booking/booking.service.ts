import { BOOKING_TYPES } from '../../config/setup';
import {
  Booking,
  Bookings,
  CreateBooking,
  UpdateBooking,
} from './booking.model';

class BookingService {
  static getAll = (customerID?: string): Promise<Booking[]> => {
    return Bookings.findMany({
      where: {
        customerID: customerID ? +customerID : undefined,
      },
      include: {
        bookingSchedule: true,
        customer: true,
        service: true,
        barber: true,
      },
      orderBy: {
        bookingID: 'asc',
      },
    });
  };

  static getByID = (bookingID: number): Promise<Booking | null> => {
    return Bookings.findFirst({
      where: { bookingID },
      include: { bookingSchedule: true },
    });
  };

  static create(booking: CreateBooking): Promise<Booking> {
    return Bookings.create({
      data: {
        bookingTotalAmount: booking.bookingTotalAmount,
        statusID: BOOKING_TYPES.PENDING,
        barberID: booking.barberID,
        customerID: booking.customerID,
        serviceID: booking.serviceID,
        shopID: 2,
        bookingSchedule: {
          create: {
            BookingDate: booking.bookingDate.toString(),
            bookingDayOfTheWeek: booking.bookingDayOfTheWeek,
            BookingEndTime: booking.bookingEndTime,
            BookingStartTime: booking.bookingStartTime,
          },
        },
      },
      include: {
        bookingSchedule: true,
      },
    });
  }

  static update = (
    booking: UpdateBooking,
    bookingID: number
  ): Promise<Booking> => {
    return Bookings.update({
      data: {
        statusID: booking.statusID,
      },
      where: {
        bookingID,
      },
      include: {
        bookingSchedule: true,
      },
    });
  };
}

export default BookingService;

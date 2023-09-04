import { Booking, CreateBooking, UpdateBooking } from './booking.model';
import BookingService from './booking.service';

class BookingHandler {
  static getAll = async (customerID?: string): Promise<Booking[]> => {
    return BookingService.getAll(customerID);
  };

  static getByID = async (bookingID: number): Promise<Booking | null> => {
    return BookingService.getByID(bookingID);
  };

  static create = async (
    service: CreateBooking
  ): Promise<Booking | undefined> => {
    const validatedBooking = CreateBooking.parse(service);

    if (validatedBooking) {
      const newBooking = await BookingService.create(validatedBooking);

      return newBooking;
    }

    return undefined;
  };

  static update = async (
    booking: UpdateBooking,
    bookingID: number
  ): Promise<Booking | undefined> => {
    const validatedBooking = UpdateBooking.parse(booking);

    if (validatedBooking) {
      const updatedBooking = await BookingService.update(
        {
          statusID: validatedBooking.statusID,
        },
        bookingID
      );

      return updatedBooking;
    }

    return undefined;
  };
}

export default BookingHandler;

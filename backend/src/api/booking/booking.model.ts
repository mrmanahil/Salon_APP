/* eslint-disable no-redeclare */
import * as zod from 'zod';
import db from '../../util/db';

export const Booking = zod.object({
  bookingID: zod.number(),
  customerID: zod.number(),
  shopID: zod.number(),
  barberID: zod.number(),
  serviceID: zod.number(),
  bookingTotalAmount: zod.number(),
  statusID: zod.number(),
  bookingSchedule: zod
    .object({
      bookingScheduleID: zod.number().optional(),
      bookingDayOfTheWeek: zod.string().optional(),
      bookingDate: zod.string().optional(),
      bookingStartTime: zod.string().optional(),
      bookingEndTime: zod.string().optional(),
    })
    .nullable(),
});

export const CreateBooking = zod.object({
  customerID: zod.number(),
  shopID: zod.number(),
  barberID: zod.number(),
  serviceID: zod.number(),
  bookingTotalAmount: zod.number(),
  bookingDayOfTheWeek: zod.string(),
  bookingDate: zod.string(),
  bookingStartTime: zod.string(),
  bookingEndTime: zod.string(),
});

export const UpdateBooking = zod.object({
  statusID: zod.number(),
});

export const ApproveBooking = zod.object({
  bookingID: zod.string(),
});

export const GetByUserID = zod.object({
  userID: zod.string().optional(),
});
export const GetByIDInput = zod.object({
  bookingID: zod.string(),
});

export type Booking = zod.infer<typeof Booking>;
export type CreateBooking = zod.infer<typeof CreateBooking>;
export type ApproveBooking = zod.infer<typeof ApproveBooking>;
export type UpdateBooking = zod.infer<typeof UpdateBooking>;
export type GetByIDInput = zod.infer<typeof GetByIDInput>;
export type GetByUserID = zod.infer<typeof GetByUserID>;

export const Bookings = db.booking;

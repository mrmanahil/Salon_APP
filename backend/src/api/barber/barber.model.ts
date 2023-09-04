/* eslint-disable no-redeclare */
import * as zod from 'zod';
import db from '../../util/db';

export const Barber = zod.object({
  barberID: zod.number().optional(),
  barberName: zod.string(),
  totalExperienceInYear: zod.number(),
  imageUrl: zod.string(),
  userID: zod.number(),
});

export const CreateBarberInput = zod.object({
  barberName: zod.string(),
  totalExperienceInYear: zod.number(),
  imageUrl: zod.string(),
});

export const UpdateBarberInput = zod.object({
  barberName: zod.string(),
  totalExperienceInYear: zod.number(),
  imageUrl: zod.string(),
});

export type Barber = zod.infer<typeof Barber>;
export type CreateBarberInput = zod.infer<typeof CreateBarberInput>;
export type UpdateBarberInput = zod.infer<typeof UpdateBarberInput>;
export const Barbers = db.barber;

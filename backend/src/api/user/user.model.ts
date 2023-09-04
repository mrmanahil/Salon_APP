/* eslint-disable no-redeclare */
import * as zod from 'zod';
import db from '../../util/db';

export const User = zod.object({
  userID: zod.number().optional(),
  email: zod.string(),
  password: zod.string(),
  salt: zod.string(),
  isVerified: zod.boolean(),
  userTypeID: zod.number(),
  name: zod.string(),
  address: zod.object({
    countryID: zod.number(),
    stateID: zod.number(),
    cityID: zod.number(),
    addressLine1: zod.string().nonempty(),
    addressLine2: zod.string().optional(),
  }),
});

export const CreateUserInput = zod.object({
  name: zod.string(),
  email: zod.string(),
  password: zod.string(),
  userTypeID: zod.number(),
  totalExperienceInYear: zod.number().optional(),
  address: zod
    .object({
      countryID: zod.number(),
      stateID: zod.number(),
      cityID: zod.number(),
      addressLine1: zod.string().nonempty(),
      addressLine2: zod.string().optional(),
    })
    .optional(),
});

export const UploadBarberImageInput = zod.object({
  barberID: zod.string(),
});

export const LoginUserInput = zod.object({
  email: zod.string(),
  password: zod.string(),
  userTypeID: zod.string(),
});

type UserType = zod.infer<typeof User>;
export type User = Omit<UserType, 'password'>;
export type CreateUserInput = zod.infer<typeof CreateUserInput>;
export type UserWithPassword = UserType;
export type UserWithoutAddress = Omit<User, 'address' | 'password'>;
export type LoginUserInput = zod.infer<typeof LoginUserInput>;
export type UploadBarberImageInput = zod.infer<typeof UploadBarberImageInput>;
export const Users = db.user;

/* eslint-disable no-redeclare */
import * as zod from 'zod';
import db from '../../util/db';

export const Customer = zod.object({
  customerID: zod.number().optional(),
  customerName: zod.string(),
  userID: zod.number(),
});

export const CreateCustomerInput = zod.object({
  customerName: zod.string(),
});

export type Customer = zod.infer<typeof Customer>;
export type CreateCustomerInput = zod.infer<typeof CreateCustomerInput>;
export const Customers = db.customer;

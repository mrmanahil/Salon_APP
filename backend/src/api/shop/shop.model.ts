/* eslint-disable no-redeclare */
import * as zod from 'zod';
import db from '../../util/db';

export const Shop = zod.object({
  shopID: zod.number().optional(),
  shopName: zod.string(),
  userID: zod.number(),
});

export const CreateShopInput = zod.object({
  shopName: zod.string(),
});

export type Shop = zod.infer<typeof Shop>;
export type CreateShopInput = zod.infer<typeof CreateShopInput>;
export const Shops = db.shop;

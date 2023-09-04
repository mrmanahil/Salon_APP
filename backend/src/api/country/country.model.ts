/* eslint-disable no-redeclare */
import * as zod from 'zod';
import db from '../../util/db';

export const Country = zod.object({
  countryID: zod.number(),
  countryName: zod.string(),
  countryCode: zod.string(),
});

type CountryType = zod.infer<typeof Country>;
export type Country = CountryType;
export const Countries = db.country;

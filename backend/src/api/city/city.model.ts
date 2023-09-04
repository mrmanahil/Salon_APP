/* eslint-disable no-redeclare */
import * as zod from 'zod';
import db from '../../util/db';

export const City = zod.object({
  cityID: zod.number(),
  cityName: zod.string(),
  cityCode: zod.string(),
  stateID: zod.number(),
});

type CityType = zod.infer<typeof City>;
export type City = CityType;
export const Cities = db.city;

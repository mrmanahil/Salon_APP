/* eslint-disable no-redeclare */
import * as zod from 'zod';
import db from '../../util/db';

export const State = zod.object({
  stateID: zod.number(),
  stateName: zod.string(),
  stateCode: zod.string(),
  countryID: zod.number(),
});

type StateType = zod.infer<typeof State>;
export type State = StateType;
export const States = db.state;

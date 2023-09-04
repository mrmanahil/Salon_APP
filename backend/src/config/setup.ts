/* eslint-disable import/prefer-default-export */

// SELECT replace(upper(lookup_type_desc), ' ', '_') || ': ' || lookup_type_id || ', ' FROM lookup WHERE lookup_type = 'USER_TYPE'
const USER_TYPE = {
  CUSTOMER_USER: 1,
  SHOP_USER: 2,
  BARBER_USER: 3,
};

const SETUP = {
  API_KEY: 'http://192.168.100.137:4000',
};

const BOOKING_TYPES = {
  PENDING: 1,
  APPROVED: 2,
  COMPLETED: 3,
  PAID: 4,
};

export { USER_TYPE, SETUP, BOOKING_TYPES };

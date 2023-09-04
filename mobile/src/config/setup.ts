import {Dimensions, StatusBar} from 'react-native';

const FONTS = {
  EXTRA_BOLD: 'Poppins-ExtraBold',
  BOLD: 'Poppins-Bold',
  MEDIUM: 'Poppins-Medium',
  REGULAR: 'Poppins-Regular',
  THIN: 'Poppins-Thin',
};

const COLORS = {
  whiteColor: '#ffffff',
  whiteColorLight: 'rgba(255, 255, 255, 0.6)',
  grayColor: '#eee',
  darkColor: '#090B0A',
  darkColor2: 'rgba(9, 11, 10, .95)',
  errorColor: '#FF331F',
};

const CONSTANTS = {
  extraLargeFontSize: 40,
  extraLargeFontLineHeight: 47,

  largeFontSize: 28,
  largeFontLineHeight: 43,

  mediumFontSize: 18,
  mediumFontLineHeight: 24,

  smallFontSize: 14,
  smallFontLineHeight: 18,

  extraSmallFontSize: 10,
  extraSmallFontLineHeight: 17,

  dateFormat: 'DD-MM-YYYY',
  timeFormat: 'hh:mm:ss A',

  appDirectoryName: 'salonApp',

  apiBaseUrl: 'https://foodidragon.com/foodyhub.pk/App/API',
  apiUploadUrl: 'https://foodidragon.com/foodyhub.pk/App/uploads',

  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
  statusBarHeight: StatusBar.currentHeight,

  requestTimeOutSeconds: 20000,

  EMAIL_REGEX:
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
};

const BOOKING_TYPES = {
  PENDING: 1,
  APPROVED: 2,
  COMPLETED: 3,
  PAID: 4,
};

const ERRORS = {};

const API_ENDPOINTS = {};

const ASYNC_STORAGE_KEYS = {};

const NAVIGATION_OPTIONS = {};

const IMAGE_URL = {};

export {
  FONTS,
  COLORS,
  CONSTANTS,
  ERRORS,
  API_ENDPOINTS,
  ASYNC_STORAGE_KEYS,
  NAVIGATION_OPTIONS,
  IMAGE_URL,
  BOOKING_TYPES,
};

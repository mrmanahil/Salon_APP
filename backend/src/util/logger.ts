import { createLogger, format, transports, addColors } from 'winston';
import config from './config';

const { colorize, timestamp, printf, combine } = format;

const myCustomFormat = format.combine(
  colorize({ all: true }),
  timestamp({ format: 'hh:mm:ss A' }),
  printf((info) => `${info.timestamp} ${info.level} : ${info.message}`)
);
addColors({
  info: 'bold blue', // fontStyle color
  warn: 'italic yellow',
  error: 'bold red',
  debug: 'green',
});
const logger = createLogger({
  level: config.ENV === 'production' ? 'info' : 'silly',
  transports: [new transports.Console({ format: combine(myCustomFormat) })],
});
export default logger;

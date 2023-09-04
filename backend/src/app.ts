import express from 'express';
import { createServer, Server as HTTPServer } from 'http';
import { Server as SocketIoServer } from 'socket.io';
import path from 'path';
import cors from 'cors';
import config from './util/config';
import logger from './util/logger';
import baseRouter from './baseRouter';
import handleError from './util/handleError';
import db from './util/db';

const app = express();
const httpServer: HTTPServer = createServer(app);

const io: SocketIoServer = new SocketIoServer(httpServer, {
  cors: {
    origin: ['http://localhost:5173'],
    credentials: true,
  },
});

app.set('io', io);
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.resolve(__dirname, '../public')));
app.use('/api/v1', baseRouter);
app.use(handleError);

httpServer.listen(config.PORT, () => {
  db.$connect().then(() => {
    logger.info(`Connected to DB`);
  });
  logger.info(`Server listening on PORT -> ${config.PORT}`);
});

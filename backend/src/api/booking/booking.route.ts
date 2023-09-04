import { Router } from 'express';
import bookingController from './booking.controller';

const bookingRouter = Router();

bookingRouter
  .route('/')
  .get(bookingController.getAll)
  .post(bookingController.create);

bookingRouter.route('/:bookingID').get(bookingController.getByID);

bookingRouter.patch('/approve', bookingController.approve);
bookingRouter.patch('/complete', bookingController.complete);
bookingRouter.patch('/paid', bookingController.paid);

export default bookingRouter;

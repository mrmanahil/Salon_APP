import { Router } from 'express';
import userRouter from './api/user/user.route';
import categoryRouter from './api/category/category.route';
import serviceRouter from './api/service/service.route';
import countryRouter from './api/country/country.route';
import cityRouter from './api/city/city.route';
import stateRouter from './api/state/state.route';
import bookingRouter from './api/booking/booking.route';

const baseRouter = Router();

baseRouter.use('/user', userRouter);
baseRouter.use('/category', categoryRouter);
baseRouter.use('/service', serviceRouter);
baseRouter.use('/country', countryRouter);
baseRouter.use('/state', stateRouter);
baseRouter.use('/city', cityRouter);
baseRouter.use('/booking', bookingRouter);

baseRouter.get('/healthCheck', (req, res) => {
  res.json({
    message: 'Working fine',
    status: 200,
    data: [],
    error: [],
  });
});

export default baseRouter;

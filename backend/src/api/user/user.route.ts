import { Router } from 'express';
import userController from './user.controller';
import uploadImage from '../../middleware/imageUpload';

const userRouter = Router();

userRouter.route('/register').post(userController.create);
userRouter.route('/login').post(userController.login);

userRouter.get('/barber', userController.getBarbers);

userRouter.patch(
  '/barber/image',
  uploadImage('barber').single('barber_image'),
  userController.uploadBarberImage
);

export default userRouter;

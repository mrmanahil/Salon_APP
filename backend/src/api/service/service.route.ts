import { Router } from 'express';
import serviceController from './service.controller';
import fileUpload from '../../util/fileUpload';
import uploadImage from '../../middleware/imageUpload';

const serviceRouter = Router();

serviceRouter.post('/', fileUpload.single('image'), serviceController.create);

serviceRouter.route('/').get(serviceController.getAll);

serviceRouter.patch(
  '/image',
  uploadImage('service').single('service_image'),
  serviceController.uploadImage
);

serviceRouter
  .route('/:serviceID')
  .get(serviceController.getByID)
  .patch(serviceController.update)
  .delete(serviceController.delete);

export default serviceRouter;

import { Router } from 'express';
import categoryController from './category.controller';
import uploadImage from '../../middleware/imageUpload';

const categoryRouter = Router();

categoryRouter.post('/', categoryController.create);

categoryRouter.route('/').get(categoryController.getAll);

categoryRouter.patch(
  '/image',
  uploadImage('category').single('category_image'),
  categoryController.uploadImage
);

categoryRouter
  .route('/:categoryID')
  .get(categoryController.getByID)
  .patch(categoryController.update)
  .delete(categoryController.delete);

export default categoryRouter;

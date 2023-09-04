import { existsSync, mkdirSync } from 'fs';
import multer, { diskStorage } from 'multer';
import path from 'path';

const uploadImage = (folderName: string) => {
  const folderPath = path.resolve(__dirname, '../../public/', folderName);

  if (!existsSync(folderPath)) {
    mkdirSync(folderPath, { recursive: true });
  }

  const storage = diskStorage({
    filename: (_req, file, cb) => {
      const fileName = `${Date.now()}.${file.originalname?.split('.')[1]}`;
      cb(null, fileName);
    },
    destination: folderPath,
  });

  return multer({
    storage,
    fileFilter(_req, file, cb) {
      const validMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validMimeTypes.find((mimeType) => mimeType === file.mimetype)) {
        cb(
          new Error(
            `Image can only be of the following formats, ${validMimeTypes.join(
              ' '
            )}`
          )
        );
        return;
      }
      cb(null, true);
    },
  });
};

export default uploadImage;

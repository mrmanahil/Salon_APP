import multer from 'multer';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    console.log('asd');

    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}.png`);
  },
});

export default multer({ storage });

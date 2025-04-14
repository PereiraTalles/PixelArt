const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => { 
    return {
      folder: 'galeriabrasil',
      allowed_formats: ['jpg', 'jpeg', 'png'],
      resource_type: 'image',
      public_id: `img-${Date.now()}-${Math.round(Math.random() * 1E9)}`,
      transformation: [ 
        { width: 1600, height: 1600, crop: 'limit' }, 
        { quality: 'auto:good' }
      ]
    };
  }
});

const fileFilter = (req, file, cb) => {
  const validFormats = ['image/jpeg', 'image/png'];
  if (validFormats.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos JPEG ou PNG são permitidos!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter, 
  limits: {   
    fileSize: 5 * 1024 * 1024 
  }
});

const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(500).json({ error: err.message });
  }
  next();
};

module.exports = {
  upload,           
  handleUploadErrors 
};
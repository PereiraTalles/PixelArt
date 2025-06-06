const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const { upload, handleUploadErrors } = require('../upload'); 

router.post(
  '/',
  upload.single('photo'), 
  handleUploadErrors,     
  photoController.createPhoto
);

router.get('/', photoController.getAllPhotos);
router.get('/:id', photoController.getPhotoById);
router.put('/:id', photoController.updatePhoto);
router.delete('/:id', photoController.deletePhoto);

module.exports = router;
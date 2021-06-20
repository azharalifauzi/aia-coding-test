import express from 'express';
import { getPhotos, getPhotoDetail } from '../controllers/flickr-controller';

const router = express.Router();

router.route('/photos').get(getPhotos);
router.route('/photos/:id').get(getPhotoDetail);

export default router;

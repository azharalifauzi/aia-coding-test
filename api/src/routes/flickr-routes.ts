import express from 'express';
import { getPhotos } from '../controllers/flickr-controller';

const router = express.Router();

router.route('/photos').get(getPhotos);

export default router;

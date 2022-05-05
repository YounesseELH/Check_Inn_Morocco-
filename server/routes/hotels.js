import express from 'express';

import { getHotels, 
    getHotelsBySearch, 
    getHotelsByCreator, 
    getHotel, 
    createHotel, 
    updateHotel, 
    likeHotel, 
    commentHotel, 
    deleteHotel } from '../controllers/hotel.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/creator', getHotelsByCreator);
router.get('/search', getHotelsBySearch);
router.get('/', getHotels);
router.get('/:id', getHotel);

router.post('/', auth,  createHotel);
router.patch('/:id', auth, updateHotel);
router.delete('/:id', auth, deleteHotel);
router.patch('/:id/likeHotel', auth, likeHotel);
router.post('/:id/commentHotel', commentHotel);

export default router;
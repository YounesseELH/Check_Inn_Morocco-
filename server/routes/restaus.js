import express from 'express';

import { getRestaus, 
    getRestausBySearch, 
    getRestausByCreator, 
    getRestau, 
    createRestau, 
    updateRestau, 
    likeRestau, 
    commentRestau, 
    deleteRestau } from '../controllers/restau.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/creator', getRestausByCreator);
router.get('/search', getRestausBySearch);
router.get('/', getRestaus);
router.get('/:id', getRestau);

router.post('/', auth,  createRestau);
router.patch('/:id', auth, updateRestau);
router.delete('/:id', auth, deleteRestau);
router.patch('/:id/likeRestau', auth, likeRestau);
router.post('/:id/commentRestau', commentRestau);

export default router;
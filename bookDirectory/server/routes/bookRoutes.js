import express from 'express';
import { protect } from '../controllers/authController.js';
import {createBook, deleteBook, getAllBooks} from '../controllers/bookController.js';


const router = express.Router();

router.route('/createBook').post(protect,createBook)
router.route('/getAllBooks').get(protect,getAllBooks)
router.route('/deleteBook/:bookId').delete(protect,deleteBook)
export default router;
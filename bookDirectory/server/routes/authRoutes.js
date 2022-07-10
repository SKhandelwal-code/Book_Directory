import express from 'express';
import {signUp, signIn, protect} from '../controllers/authController.js'
import { createAuthor, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
router.route('/createAuthor').post(protect,createAuthor);
router.route('/getAllUsers').get(protect,getAllUsers)

export default router;
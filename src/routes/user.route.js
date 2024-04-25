import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import * as userVerify from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('', newUserValidator, userController.newUserRegister);

router.post('/login',userController.userLogin);

router.post('/login/verify',userVerify.userAuth);

export default router;

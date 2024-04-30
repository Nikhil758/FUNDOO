import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator, resetPasswordValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
const router = express.Router();

// //route to get all users
// router.get('', userController.getAllUsers);

//route to create a new user
router.post('', newUserValidator, userController.newUserRegister);

router.post('/login', userController.userLogin);

router.put('/forget', userController.forgetPassword);

router.put('/reset', resetPasswordValidator, userAuth, userController.resetPassword);

export default router;

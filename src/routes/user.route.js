import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import * as userVerify from '../middlewares/auth.middleware';

const router = express.Router();

// //route to get all users
router.get('', userController.getAllUsers);

//route to create a new user
router.post('', newUserValidator, userController.newUserRegister);

router.post('/login',userController.userLogin);

router.post('/login/verify',userVerify.userAuth);

// //route to get a single user by their user id
// router.get('/:_id', userController.getUser);

// //route to update a single user by their user id
router.put('/login/verify/:_id', userController.updateUser);

// //route to delete a single user by their user id
router.delete('/login/verify/:_id', userController.deleteUser);

export default router;

import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import jwt from 'jsonwebtoken';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUserRegister = async (req, res, next) => {
  try {
    const data = await UserService.newUserRegister(req.body);
    const{first_name,last_name,email}=data;
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'User created successfully',
      data: {
        first_name,
        last_name,
        email
      }
    });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req,res,next) => {
  try{
    const data = await UserService.userLogin(req.body);
    const token = jwt.sign({id:data._id,email:data.email},process.env.SECRETKEY,{expiresIn:'2h'});
    const{_id,first_name,last_name,email}=data;
    res.status(HttpStatus.OK).json({
      success: true,
      message:'User Found in our dataBase',
      data:{
        _id,
        first_name,
        last_name,
        email,
        token
      }
    });
  }catch(error){
    res.status(HttpStatus.BAD_REQUEST).json({
      code:HttpStatus.BAD_REQUEST,
      message:`${error}`
    });
  }
};
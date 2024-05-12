import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import client from '../utils/redis';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUserRegister = async (req, res, next) => {
  try {
    const data = await UserService.newUserRegister(req.body);
    client.set(data.email, 3600, JSON.stringify(data));
    const { first_name, last_name, email } = data;
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

export const userLogin = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user data exists in Redis cache
    client.get(email, async (err, userData) => {
      if (err) {
        console.error('Redis error:', err);
      }

      if (userData) {
        // User data found in Redis cache, return it
        res.status(HttpStatus.OK).json({
          success: true,
          message: 'User found in cache',
          data: JSON.parse(userData)
        });
      } else {
        // User data not found in cache, fetch from database
        const data = await UserService.userLogin(req.body);

        // Cache user data in Redis
        client.set(email, 3600, JSON.stringify(data));

        res.status(HttpStatus.OK).json({
          success: true,
          message: 'User found in database',
          data
        });
      }
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const data = await UserService.forgetPassword(req.body);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Reset Password Link is sent',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const data = await UserService.resetPassword(
      res.locals.user._id,
      res.locals.user.email,
      req.body
    );
    const { _id, first_name, last_name, email } = data;
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Password updated in dataBase',
      data: {
        _id,
        first_name,
        last_name,
        email
      }
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

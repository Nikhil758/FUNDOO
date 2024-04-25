import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken'
const secretKey = process.env.SECRETKEY;

export function createToken(user){
    const payload = {
        _id: user._id,
        email: user.email
    }
    return jwt.sign(payload,secretKey,{expiresIn:'2h'});
}
import User from '../models/user.model';
import bcrypt from 'bcrypt'
import { createToken } from '../utils/user.util';

//create new user
export const newUserRegister = async (body) => {
  let res =await User.findOne({email:body.email})
  // console.log("Message",res);
  if(res!==null){
    throw new Error('Email already exist')
  }
  body.password = await bcrypt.hash(body.password,10);
  const data = await User.create(body);
  return data;
};

//Login
export const userLogin = async(body)=>{
  let userObj = await User.findOne({email:body.email})
  if(userObj===null){
    throw new Error('Incorrect Email')
  }
  const isMatch = await bcrypt.compare(body.password,userObj.password);
  if (isMatch){
    const token = createToken(userObj)
    return token;
  }else{
    throw new Error("Incorrect Password")
  }
}; 

//Reset Password
export const resetPassword = async(_id,body)=>{
  let userObj = await User.findOne({email:body.email})
  if(userObj===null){
    throw new Error('User does not exist')
  }
  const isMatch = await bcrypt.compare(body.password,userObj.password);
  if (isMatch){
    throw new Error('Change the password')
  }
  body.password = await bcrypt.hash(body.password,10);
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
}; 
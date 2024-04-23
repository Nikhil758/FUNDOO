import User from '../models/user.model';
import bcrypt from 'bcrypt'


// //get all users
// export const getAllUsers = async () => {
//   const data = await User.find();
//   return data;
// };

//create new user
export const newUserRegister = async (body) => {
  let res =await User.findOne({email:body.email})
  // console.log("Message",res);
  if(res!==null){
    throw new Error('Email already exist')
  }
  body.password = await bcrypt.hash(body.password,10);
  body.confirm_password = await bcrypt.hash(body.confirm_password,10);
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
    return userObj;
  }else{
    throw new Error("Incorrect Password")
  }
};
// //update single user
// export const updateUser = async (_id, body) => {
//   const data = await User.findByIdAndUpdate(
//     {
//       _id
//     },
//     body,
//     {
//       new: true
//     }
//   );
//   return data;
// };

// //delete single user
// export const deleteUser = async (id) => {
//   await User.findByIdAndDelete(id);
//   return '';
// };

// //get single user
// export const getUser = async (id) => {
//   const data = await User.findById(id);
//   return data;
// };

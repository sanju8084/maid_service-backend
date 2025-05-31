
import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const signUp = async (req, res,next) => {
   try{
const {name,email,password}=req.body

const user=await UserModel.findOne({email})
if(user){
    return res.status(409).json({
        success:true,
        message:'already register please login',
    })
}
const userModel=await new UserModel({name,email,password});
userModel.password=await bcrypt.hash(password,10);
await userModel.save();
res.status(201).json({
    success:true,
    message:'User register successfully',

})

   }
   catch(error){
    console.log(error)
    res.status(500).json({
        success:false,
        message:'error in signUp'
        
    })
   }
};
export const login=async (req,res,next)=>{
    try{
const {email,password}=req.body;
const user=await UserModel.findOne({email})
if(!user){
    return res.status(403).json({
        success:false,
        message:'email is not registered'
    })
}
const isPassEqual=await bcrypt.compare(password,user.password);
if(!isPassEqual){
    return res.status(403).json({
        success:false,
        message:'invalid password'
    });
}
const jwtToken =await jwt.sign({email:user.email, _id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'});
res.status(200).json({
    success:true,
    message:'login successfully',
    jwtToken,
    email,
    name:user.name
})
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in login',
        })
    }
}
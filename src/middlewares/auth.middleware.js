import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../db/dbConnection.js";
import jwt from 'jsonwebtoken';

export const verifyJWT=asyncHandler(async(req,_,next)=>{
   try {
    const token= req.cookies.accessToken?.accessToken || req.header("Authorization")?.replace("Bearer ","")
 
     if(!token)
     {
         throw new ApiError(404,"Unauthorized request")
     }
 
     const decodeToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
 
   
     const userExist = await User.findOne({
         where: { id: decodeToken?.id },
         attributes: ['id', 'username', 'email']
         });
     if(!userExist)
     {
         throw new ApiError(404,"Invalid Access Token")
     }
 
     req.user=userExist

     next();
   } catch (error) {
     throw new ApiError(401,error?.message || "Invalid Access Token")
   }
})
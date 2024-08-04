import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../db/dbConnection.js";
import { encryptPassword, isPasswordCorrect,generateToken } from "../utils/encrypt.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { or } from "sequelize";



const registerUser=asyncHandler(async(req,res)=>{

    const {username,email,password}=req.body;
    
     /*
    1. destruction the request body
    2. validate the request fields
    3. check in database table users
    4. Hash the password to save
    5. create the user in table
    6. Send the response
   */

   if([username,email,password].some((field)=>
    field?.trim()===""
   )){
    throw new ApiError(400,"All feilds are required")
   }
  
   const userExist = await User.findOne({
    where: { username: username }
    });

    if (userExist) {
        throw new ApiError(409,`User ${username} is allready exist`)
    } 

    const hashedPassword = await encryptPassword(password);
    console.log(hashedPassword);

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password: hashedPassword,
    });

    const createdUser = await User.findOne({
        where: { id: user.id },
        attributes: ['id', 'username', 'email']
    });
    if(!createdUser)
    {
        throw new ApiError(500, "Some thing went wrong while registration")
    }
    console.log(`User ${username} is created successfully.`);
    console.log(user.toJSON());

   return res.status(201).json(
        new ApiResponse(200,createdUser,"User created successfully")
   )
   

})

   const loginUser=asyncHandler(async(req,res)=>{

    /*

        TO DOs-
        1. destructure the res.body to get username and password
        2. Verify the username is register 
        3. validate the login password with register password
        4. generate access token and refresh token
        5. update the user table with refresh token
        6. send the access token to the client
    */


    const {username,password}=req.body;

    if(!username || !password)
        {
            throw new ApiError(400,"username or password is required")
        }

    const userExist = await User.findOne({
        where: { username: username.toLowerCase() }
        });

    if(!userExist)
        {
            throw new ApiError(400,"User does not Exist")
        }
    
        
    const isPasswordValid = await isPasswordCorrect(password, userExist.password);

    if(!isPasswordValid)
        {
            throw new ApiError(400,"Username or password is wrong")
        }

    const userDetails={
        id: userExist.id, 
        username: userExist.username, 
        email: userExist.email
      };

    //Generated access-token but need to develop refresh token 
    const access_token=await generateToken(userDetails)

    // send response in cookies
    // set the cookies Options object so that it should be safe and non-editable in client side

    const options={
        httpOnly:true,
        secure:true
    }

   //need to develop refresh token concept in cookies
    return res
    .status(200)
    .cookie("accessToken",access_token,options)
    .json(
        new ApiResponse(
            200,
            {
                user:userDetails, access_token
            },
            "User login successfully"
        )
    )
   })


 
   const logoutUser=asyncHandler(async(req,res)=>{

    const options={
        httpOnly:true,
        secure:true
    }

    //need to clear refresh token once get developed

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .json(
        new ApiResponse(
            201,
            {},
            "User logout successfully"
        )
    )
   })



export {
    registerUser,
    loginUser,
    logoutUser
}
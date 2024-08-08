import { asyncHandler } from "../utils/asyncHandler.js"
import { Blog } from "../db/dbConnection.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"


const postBlog=asyncHandler(async(req,res)=>{

    const {title,description}=req.body;

    if([title,description].some((fields)=>fields?.trim()==="")){

        throw new ApiError(400,"All feilds are required")
    }
    const {id}=req.user;
    console.log(req.body)
    
    //file is stored on server using multer as middleware and get the path of the uploaded img
    const serverTempPostImgPath=req.file.path;
    console.log(serverTempPostImgPath)
    if(!serverTempPostImgPath)
    {
        throw new ApiError(404,"Blog Image is required to Post")
    }
    // Local file path
   // const fullFilePath = "C:\\Users\\rohit\\XathleanBackend\\public\\temp\\darkMode.jpg";
    const cloudPostImageURL=await uploadOnCloudinary(req.file.path)
    console.log(cloudPostImageURL)
    // check user is exist in the user table before post the blog

    // Now Ready to create entry for blog table  using Blog Module and apply await
    const blog = await Blog.create({
        title: title,
        description:description,
        imageURL:cloudPostImageURL.secure_url,
        userId:id
    });

    const createdPost = await Blog.findOne({
        where: { id: blog.id },
        attributes: ['title', 'description','imageURL', 'userId']
    });

    if(!createdPost)
    {
        throw new ApiError(500, "Some thing went wrong while registration")
    }
    console.log(`UserID ${id} is created Blog successfully.`);
    console.log(blog.toJSON());

   return res.status(201).json(
        new ApiResponse(200,createdPost,"Blog created successfully")
   )
 


});


export {postBlog}
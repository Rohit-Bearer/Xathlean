import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

 // Configuration
 cloudinary.config({ 
    cloud_name: "dohevxewg", 
    api_key: 735176292328941, 
    api_secret:"xDDaB2BC38xObRZqb3zMTuFs31s"
});


const uploadOnCloudinary=async(localFilePath)=>{
    try {
        
        if(!localFilePath)return console.log("localfilepath not found")
           console.log(localFilePath) 
       const response= await cloudinary.uploader.upload(localFilePath,{
        resource_type:"image"
       })
       // console.log(response)
       // console.log("File is uploaded successfully",response.url)
       fs.unlinkSync(localFilePath);
        return response
    } catch (error) {
       fs.unlinkSync(localFilePath)
       console.log("Error is :: ", error.stack)
        return null
    }
}


export{
    uploadOnCloudinary,
}
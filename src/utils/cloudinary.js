import { v2 as cloudinary } from "cloudinary";

import fs from "fs";

cloudinary.config({   //configuring cloudinary
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//uploading an image
const uploadOnCloudinary = async (localFilePath) => {  //function that saves to cloudinary that will be used in the program logic
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        });
        console.log("file uploaded on cloudinary",response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation failed
        return null;
    }
}

export {uploadOnCloudinary};
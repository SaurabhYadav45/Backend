const fileUpload = require("express-fileupload");
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//LocalFileUpload handler function

exports.localFileUpload = async(req, res) =>{
    try {
        const file = req.files.file;
        console.log("FILE AA GAYEE :->", file);

        let path = __dirname + "/files/" + Date.now();
        console.log("PATH->", path);
        file.mv(path, (err) =>{
            console.log(err);
        });

        res.json({
            success:true,
            message:"Local file uploaded sucxcessfully"
        });
    } catch (error) {
        console.log(error);
    }
}


function isSupported(fileType, supportedTypes){
    return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};

    if(quality){
        options.quality = quality;
    }
    
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async(req, res) =>{
    try {
        const{name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // Validation of file type
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isSupported){
            return res.status(400).jsom({
                success: false,
                message:"File format not supported",
            })
        }

        console.log("Uploading file to Cloudinary")
        const response = await uploadFileToCloudinary(file, "SaurabhYadav");
        console.log(response);

        //Create DB Entry
        const fileData = await File.create({
            name,
            tags, 
            email,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully",
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message:"Something went wrong"
        })
    }
}


exports.videoUpload = async(req, res) =>{
    try {
        const{name, tags, email} = req.body;
        const file = req.files.videoFile;

        //Validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isSupported){
            return res.sttus(400).json({
                success:false,
                message:"File format not suported",
            })
        }

        const response = await uploadFileToCloudinary(file, "SaurabhYadav");
        console.log(response);

        const fileData = await File.create({
            name, 
            tags,
            email,
            videoUrl:response.secure_url,
        });

        res.json({
            success: true,
            videoUrl:response.secure_url,
            message:"Video uploaded successfully"
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message:"Something went wrong"
        })
    }
}


exports.imageSizeReducer = async(req, res) =>{
    try {
        const{name, tags, email} = req.body;
        const file = req.files.imageReducerFile;

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isSupported){
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
        }

        const response = await uploadFileToCloudinary(file, "SaurabhYadav", 90);
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secret_url,
        });

        res.status(200).json({
            success:false,
            imageUrl: response.secret_url,
            message:"Image uploaded succsessfully"
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message:"Something went wrong"
        })
    }
}
const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const cloudinary = require("../../config/cloudinary");
const streamifier = require('streamifier');

const signup = async(req, res)=> {
    const {username, email, password} = req.body;
    try {
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({message: "User already exists"})
        }
        
        // check if file exists
        if(!req.file){
            return res.status(400).json({message: "Profile picture is required"})
        }

        // Upload to cloudinary using stream
        const uploadPromise = new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "profile_pictures" },
                (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }
            );
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

        const result = await uploadPromise;

        // hash password using async/await
        const hash = await bcrypt.hash(password, 10);
        
        // storing the hashed password in the database
        const newUser = new userModel({
            username,
            email,
            password: hash,
            profilePicture: result.secure_url,
        });

        await newUser.save();
         
        // fetching userData without password from DB
        const getNewUser = await userModel.findOne({email}).select("-password");

        if(!getNewUser){
            return res.status(500).json({message: "User not found"});
        }

        res.status(201).json({
            message: "User signup successfully",
            data: getNewUser
        });
    } catch (error) {
        console.log("Error while signup user", error);
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports = signup;
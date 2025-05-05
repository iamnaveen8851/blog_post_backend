const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async(req, res)=> {
    const {email, password} = req.body;
    console.log("Request body", req.body);
    
    try {
        const existingUser = await userModel.findOne({email})

        if(!existingUser){
            return res.status(404).json({message: "User not found"})
        }

        // compare password'
        const isPassword = await bcrypt.compare(password, existingUser.password)

        if(!isPassword){
            return res.status(400).json({message: "Invalid credentials"})
        }

        // fetch user details without password
        const getUserDetails = await userModel.findOne({email}).select("-password")


        // generate token
        const token =  jwt.sign({userId: getUserDetails._id,username: getUserDetails.username, email: getUserDetails.email}, process.env.JWT_SECRET, {expiresIn: "2d"})
        
        res.cookie("token", token, {
            httpOnly :true,
            secure: process.env.NODE_ENV === "production"? true : false,
            sameSite: process.env.NODE_ENV === "production"? "Strict" : "lax",
            maxAge: 2 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
        message: "Login successful",
        data: getUserDetails,
        accessToken: token,
        })

    } catch (error) {
        console.log("Error while login", error)
        res.status(500).json({message: "Internal server error"})
    }
}

module.exports = login;
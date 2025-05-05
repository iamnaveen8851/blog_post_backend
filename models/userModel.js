const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [10, "Username cannot exceed 10 characters"],
        match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email address"
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 8 characters long"],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        ]
    },
    profilePicture: {
        type: String,
        required: [true, "Profile picture is required"],
        match: [
            /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i,
            "Please provide a valid image URL (jpg, jpeg, png, or gif)"
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },



}, {
    versionKey: false
})



const userModel = mongoose.model("users_data", userSchema)

module.exports = userModel
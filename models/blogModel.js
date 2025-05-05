const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength:[3, "Title must be at least 3 characters long"],
        maxlength: [100, "Title cannot exceed 100 characters"]
    },

    description: {
        type: String,
        required: true,
        minlength: [10, "Description must be at least 10 characters long"]
    },

    image: {
        type: String,
        required: true,
        match: [
            /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i,
            "Please provide a valid image URL (jpg, jpeg, png, or gif)"
        ]
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users_data",
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }


}, {
    versionKey: false
})


const blogModel = mongoose.model("blogs_data", blogSchema)


module.exports = blogModel
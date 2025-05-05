const blogModel = require("../../models/blogModel")
const cloudinary = require("../../config/cloudinary");
const streamifier = require('streamifier');

const updateBlog = async(req, res)=> {
    try {
        const id = req.params.id;

        // Check if blog exists
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        // Since author is an ObjectId, we should compare directly with it
        if (blog.author.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Not authorized to update this blog"
            });
        }

        const updateData = {
            title: req.body.title,
            description: req.body.description
        };

        // Handle image update if new image is provided
        if (req.file) {
            const uploadPromise = new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "blog_images" },
                    (error, result) => {
                        if (error) reject(error);
                        resolve(result);
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });

            const result = await uploadPromise;
            updateData.image = result.secure_url;
        }

        const updatedBlog = await blogModel.findByIdAndUpdate(
            id, 
            updateData,
            { new: true }  // Return updated document
        ).populate('author', 'username ');

        res.status(200).json({
            message: "Blog updated successfully",
            data: updatedBlog
        });
    } catch (error) {
        console.log("Error while updating blog data", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = updateBlog;
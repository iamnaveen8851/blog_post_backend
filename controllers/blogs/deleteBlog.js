const blogModel = require("../../models/blogModel")

const deleteBlog = async(req, res)=> {
    try {
        const id = req.params.id;  // Changed from _id to id to match route parameter

        // Check if blog exists
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        // Check if user is authorized to delete
        if (blog.author.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Not authorized to delete this blog"
            });
        }

        const deletedBlog = await blogModel.findByIdAndDelete(id)

        res.status(200).json({
            message: "Blog deleted successfully",
            data: deletedBlog
        })
    } catch (error) {
        console.log("Error while deleting blog data", error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

module.exports = deleteBlog
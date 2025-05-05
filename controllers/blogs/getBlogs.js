const blogModel = require("../../models/blogModel");


const getBlogs = async(req, res)=> {
    try {
        const allBlogs = await blogModel.find().populate("author","username")
 
        if(!allBlogs){
            return res.status(404).json({
                message: "No Blogs found"
            })
        }

        res.status(200).json({
            message : "All Blogs Data Fetched",
            data: allBlogs
        })
    } catch (error) {
        console.log("Error while fetching blogs data", error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

module.exports = getBlogs;
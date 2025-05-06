const blogModel = require("../../models/blogModel");

const getSingleBlog = async (req, res)=> {
    try{
        const id = req.params._id;
        const singleBlog = await blogModel.findById(id)

        res.status(200).json({
            message: "Single Blog Fetched",
            data: singleBlog
        })
    }catch(error){
        res.status(500).json({
            message: "Error while fetching single blog",
            error
        })
    }
}

module.exports = getSingleBlog;
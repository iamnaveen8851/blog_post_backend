const cloudinary = require("../../config/cloudinary")
const streamifier = require("streamifier");
const blogModel = require("../../models/blogModel");

const createBlog = async (req, res) => {
    console.log("i am hit")
    try {
        // Access form fields directly
        const title = req.body.title;
        const description = req.body.description;

        // Validate required fields
        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }

        if(!req.file){
          return res.status(400).json({
              message: "Blog image is required."
          })
        }

        // upload image to cloudinary
        const uploadPromise = new Promise((resolve, reject)=> {
            const stream = cloudinary.uploader.upload_stream(
                {folder : "blog_images"},
                (error, result)=> {
                    if(error){
                        reject(error)
                    }else{
                        resolve(result)
                    }
                }
            )
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        })

        const result = await uploadPromise;

        const newBlog = new blogModel({
            title,
            description,
            image: result.secure_url,
            author: req.user.userId
        })

        await newBlog.save()

        res.status(201).json({
            message: "Blog created successfully",
            data : newBlog
        })

    } catch (error) {
        console.log("Error while creating blog:", error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

module.exports = createBlog;
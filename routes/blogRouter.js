const {Router} = require("express");
const getBlogs = require("../controllers/blogs/getBlogs");
const createBlog = require("../controllers/blogs/createBlog");
const updateBlog = require("../controllers/blogs/updateBlog");
const deleteBlog = require("../controllers/blogs/deleteBlog");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const blogRouter = Router();

blogRouter.get("/", getBlogs)

blogRouter.post("/createBlog",authMiddleware, upload.single('image') ,createBlog)

blogRouter.patch("/updateBlog/:id",authMiddleware, upload.single('image') ,updateBlog)

blogRouter.delete("/deleteBlog/:id",authMiddleware ,deleteBlog)


module.exports = blogRouter;


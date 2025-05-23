const {Router} = require('express');
const getUsers = require('../controllers/auth/getUser');
const signup = require('../controllers/auth/signup');
const login = require('../controllers/auth/login');
const upload = require('../middleware/uploadMiddleware');
const logout = require('../controllers/auth/logout');
const getSingleBlog = require('../controllers/blogs/getSingleBlog');

const userRouter = Router();


userRouter.get("/", getUsers)

userRouter.get("/:id", getSingleBlog)

userRouter.post("/signup", upload.single('profilePicture'), signup)

userRouter.post("/login", login)

userRouter.post("/logout", logout)





module.exports = userRouter;
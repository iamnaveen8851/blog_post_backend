const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRouter');
const cookieParser = require('cookie-parser');
const blogRouter = require('./routes/blogRouter');

// create Server
const app = express();

// middleware
app.use(express.json());
app.use(cors(
    {
        origin : process.env.NODE_ENV === "production"? process.env.PRO_URL : process.env.DEV_URL,
        credentials: true
    }
))
app.use(cookieParser())


// routes
app.use("/users", userRouter)
app.use("/blogs", blogRouter)

app.get("/", (_, res)=> {
    res.send("Welcome to the blog post server!");
})


const PORT = process.env.PORT || 8080


app.listen(PORT, async() => {
    await connectDB()
    console.log(`Server is running on port ${PORT}`);
});

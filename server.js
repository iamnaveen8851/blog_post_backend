const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());
app.use(cors())

app.get("/", (_, res)=> {
    res.send("Welcome to the blog post server!");
})


const PORT = process.env.PORT || 8080


app.listen(PORT, async() => {
    await connectDB()
    console.log(`Server is running on port ${PORT}`);
});

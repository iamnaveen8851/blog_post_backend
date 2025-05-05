const jwt = require("jsonwebtoken");
require("dotenv").config();


const authMiddleware = (req, res, next)=> {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer", "")

    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded", decoded);
        req.user = decoded;
        console.log("req.user", req.user)
        next()
    } catch (error) {
        res.status(403).json({ message: "Invalid Token" });
    }

}


module.exports = authMiddleware;
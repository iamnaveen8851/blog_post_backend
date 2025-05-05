const userModel = require("../../models/userModel");


const getUsers = async(req, res)=> {
try {
    const usersData = await userModel.find()

    res.status(200).json({
        message: "Users Data fetched successfully",
        data: usersData
    })
    
} catch (error) {
    console.log("Error while getting user", error)
    res.status(500).json({message: "Internal server error"})
}
}

module.exports = getUsers;
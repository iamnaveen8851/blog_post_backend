
const logout = async (req, res) => {
   res.clearCookie("token", {
    httpOnly: true,
    secure : process.env.NODE_ENV === "production"? true : false,
    sameSite: process.env.NODE_ENV === "production"? "Strict" : "lax",
   })
   .status(200)
  .json({
    message: "Logged out successfully",
  });
}

module.exports = logout;


const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async(req, res, next) => {
    try {
        //extract jwt token
        console.log("cookie : ", req.cookies.token);
        console.log("body : ", req.body.token);
        console.log("header : ", req.header("Authorization"));

        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        // console.log(token);
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token missing"
            });
        }

        // Verify the token
        // console.log(token);
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decode);
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something went wrong while verifying the token"
        });
    }
}


exports.isStudent = async(req, res, next)=>{
    try {
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success: false,
                message:"This is a protected route for Student",
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role is not matcing"
        });
    }
}


exports.isAdmin = async(req, res, next) =>{
    try {
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success: false,
                message:"This is a protected route for Admin",
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Admin role is not matcing"
        });
    }
}
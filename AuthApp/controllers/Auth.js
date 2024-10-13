const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();


exports.signup = async(req, res) => {
    try {
        const{name, email, password, role} = req.body;
        // Check if user already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message:"User already exist"
            });
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            res.status(401).json({
                success: false,
                message:"Error in hashing Passowrd"
            });
        }

        // create entry for new user
        const newUser = await User.create({
            name, email, password: hashedPassword, role
        })
        res.status(200).json({
            success:true,
            message:"User created Successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User can't be created, please try later"
        });
    }
}


exports.login = async(req, res) =>{
    try {
        const{email, password} = req.body;

        // Validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message:"Please fill all the details carefully"
            });
        }

        // Check if user already exist
        let existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({
                success: false,
                message:"User doesn't exist"
            })
        }

        // console.log(existingUser);
        
        const payload = {
            email: existingUser.email,
            id: existingUser._id,
            role:existingUser.role,
        };

        // Validate password and generate jwt token
        // The bcrypt.compare() function is used to compare a plain text password with a hashed password in Node.js
        if(await bcrypt.compare(password, existingUser.password)){
            //jwt.sign(): This function generates a new JWT. It takes three main arguments:
            let token  = jwt.sign(payload, process.env.JWT_SECRET, 
                {
                    expiresIn:"2h",
                });
            
            existingUser = existingUser.toObject();
            existingUser.token = token;
            existingUser.password = undefined;
            // console.log(existingUser);
            const options ={
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }

            // res.cookie("token", token, options).status(200).json({
            //     success: true,
            //     token,
            //     existingUser,
            //     message:"User Logged In Successfully",
            // })

            res.status(200).json({
                success: true,
                token,
                existingUser,
                message:"User Logged In Successfully",
            })
        }
        else{
            return res.status(403).json({
                success:false,
                message:"Password Incorrect"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User doesn't get loggedIn , try later"
        });
    }
}
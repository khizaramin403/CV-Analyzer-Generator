const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require("../models/blacklist.model")


/**
 * @route registerUserContoller
 * @description register a new user, expect user name email and password from request body
 * @access public
 */

async function registerUserController(req,res){
    const {username, email, password} = req.body;

    
        if (!username || !email || !password){
            return res.status(400).json({
                message: "please provide username, email and password"
            })
        }

        const isUserAlreadyExists = await userModel.findOne({
            $or:[{username},{email}]
        })

        if(isUserAlreadyExists){
            return res.status(400).json({
                message: "user already exists with this email or username"
            })
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hash
        });

        const token =jwt.sign({
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )
     res.cookie("token", token)
     res.status(201).json({
        message: "user registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
     })
    
}


/**
 * @name loginUserContoller
 * @description login a user, expect email and password from request body
 * @access public
 */

async function loginUserController(req, res){
    const {email, password} = req.body;

    // if(!email || !password){
    //     return res.status(400).json({
    //         message: "please provide email and password"
    //     })
    // }

    const user = await userModel.findOne({
        email
    });

    if(!user){
        return res.status(404).json({
            message: "User not found. Please sign up first."
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid email or password."
        })
    }


    const token = jwt.sign({
        id: user._id,
        username: user.username,
    },
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
)
    res.cookie("token", token)
    res.status(200).json({
        message: "user logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


/**
 * @name logoutUserController
 * @description logout a user and clear token from user cookie and add the token in the blacklist
 * @access public
 */

async  function logoutUserController(req, res){
    const token = req.cookies.token;

    if(token){
        await tokenBlacklistModel.create({token})
    }

    res.clearCookie("token")
    res.status(200).json({
        message: "user logged out successfully"
    })
    
}


/**
 * @name getMeController
 * @description get the current user login details
 * @access private
 */

async function getMeController (req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message:"user details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}


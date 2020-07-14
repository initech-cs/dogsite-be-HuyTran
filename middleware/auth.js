const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

// const AppError = require("../utils/appError");
// const catchAsync = require("../utils/catchAsync");

exports.loginRequired = async (req, res, next) => { 
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")){
            return (new AppError(401,"Unauthorize 1"))
        }

        const token = req.headers.authorization.replace("Bearer ", "")
        const decoded = jwt.verify(token, process.env.SECRET)

        // decoded._id
        const user = await User.findOne({_id: decoded, tokens: token})

        if(!user){
            return (new AppError(401,"Unauthorize 2"))
        }
        req.user = user

        next()
    }catch(err){
        res.status(401).json({
            status: "fail",
            message: err.message
        })
    }
        
}

exports.hostRequired = (req, res, next) => {
    if(req.user.type !== 'host'){
        res.status(401).json({
            status: "fail",
            message: err.message
        })
    }
    next()
}
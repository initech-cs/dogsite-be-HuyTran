const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

// const AppError = require("../utils/appError");
// const catchAsync = require("../utils/catchAsync");

exports.loginRequired = async (req, res, next) => { 
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")){
            return res.status(401).json({
                status:"fail",
            })
        }

        const token = req.headers.authorization.replace("Bearer ", "")
        
        console.log(token)

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

exports.adminRequired = (req, res, next) => {
    if(req.user.type !== 'admin'){
        res.status(401).json({
            status: "fail",
            message: err.message
        })
    }
    next()
}

exports.kennelRequired = (req, res, next) => {
    if(req.user.type !== 'kennel'){
        res.status(401).json({
            status: "fail",
            message: err.message
        })
    }
    next()
}
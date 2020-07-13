const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.loginRequired = catchAsync(async (req, res, next) => { 

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
})

exports.hostRequired = (req, res, next) => {
    if(req.user.type !== 'host'){
        return (new AppError(401,"Host required"))
    }
    next()
}
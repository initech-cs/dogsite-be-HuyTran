const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("Email is invalid")
        //     }
        // }
    },
    name: {
        type: String,
        require: [true, "Name is required"],
        trim: true,
    },
    password: {
        type: String,
        require: [true, "Password is required"],
    },
    phone:{
        type: Number,
        require: [true, "Phone number is required"],
    },
    tokens: [String],
    type: {
        type: String,
        enum: ["guess", "owner", "host"],
        required: [true, "Type is required"],
        default: "guess"
    }
},{
    timestamps: true,
    toJSON: {virtuals: true}, 
    toObject: {virtuals: true}
})

const User = mongoose.model("User", userSchema)
module.exports = User
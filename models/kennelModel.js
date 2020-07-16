const mongoose = require('mongoose')

const kennelSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, "Email is required"],
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
    phone:{
        type: Number,
        require: [true, "Phone number is required"],
    },
    since:{
        type: Number,
        required:[true, "since is required"]
    },
    breeds:[String],
    images:{
        type:String,
        required:[true, "img is required"]
    },
    slogan:{
        type: String,
        required:[true, "title is required"]
    },
    desc:{
        type: String,
        required:[true, "desc is required"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User", 
        required: [true, "Breeder must have a user"]
    }
},{
    timestamps: true,
    toJSON: {virtuals: true}, 
    toObject: {virtuals: true}
})

const Kennel = mongoose.model("Kennel", kennelSchema)
module.exports = Kennel
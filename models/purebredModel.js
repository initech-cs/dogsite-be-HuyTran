const mongoose = require('mongoose')

const purebredSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    breed:{
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    age: {
        type: String,
        required: true
    },
    height:{
        type: Number,
        required: true,
    },
    weight:{
        type: Number,
        required: true
    },
    kennel:{
        type: mongoose.Schema.ObjectId,
        ref: "Kennel", 
        required: true,
    },
    is_available: Boolean,
    litter: {
        type: Number,
        required: true
    }, 
    gender:{
        type: String,
        required: true
    }
})

const Purebred = mongoose.model("Purebred", purebredSchema)
module.exports = Purebred
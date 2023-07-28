const mongoose = require("mongoose")

const PropertySchema = new mongoose.Schema({
    //646fa3d2a8778c4b2c5f4543
    currentOwner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        min: 6,
    },
    type: {
        type: String,
        enum: ["beach", "mountain", "village"],
        required: true
    },
    desc: {
        type: String,
        required: true,
        min: 50,
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sqmeters: {
        type: Number,
        required: true,
        min: 15
    },
    state: {
        type: String,
        required: true
    },
    zipCode:{
        type: Number,
        required: true
    },
    beds: {
        type: Number,
        required: true,
        min: 1
    },
    bathrooms:{
        type:Number,
        required: true,
        min:1
    },
    featured: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true})

module.exports = mongoose.model("Property", PropertySchema)
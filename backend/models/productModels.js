const mongoose = require("mongoose")


const Schema = mongoose.Schema
const productSchema = new mongoose.Schema({
    productID:{
        type:Schema.Types.ObjectId, 
    },

    name:{
        type:String,
        required:[true, "Please enter product name!"]
    },
    description:{
        type:String,
        required:[true, "Please enter product description!"]
    },
    price:{
        type:String,
        required:[true, "Please enter product price!"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    }
    ],
    category:{
        type:String,
        required:[true, "Please enter product Category!"]
    },
    stock:{
        type:Number,
        default:1,
        required:[true, "Please enter product Stock!"],
        maxlength:[4, "Stock cannot exceed 4 chars"]
    },
    numOfReview:{
        type:Number,
        default:0
    },
    review:[
        {
            user:{type:mongoose.Schema.ObjectId,
                required:true,
                ref:"User",
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            },

        }
    ],
    user:{type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User",
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Product", productSchema)
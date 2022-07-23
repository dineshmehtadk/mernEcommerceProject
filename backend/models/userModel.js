const mongoose = require("mongoose");
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const validator = require("validator")


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Enter your name:"],
        maxlength: [30,"Name can't be exceed 30 chars"],
        min:[4, "Name can't less than 4 chars "]

    },
    email:{
        type:String,
        required:[true, "Enter your email"],
        unique: true,
        validate:[validator.isEmail, "Enter a valid email"]
    },


    password:{
        type:String,
        required:[true, "Enter your password"],
        minlength:[8, "Password must be more than 7 chars"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            
        },
        url:{
            type:String,
            
        }
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type: Date,
        default : Date.now,
    },
    resetPasswordToken :String,
    resetPasswordExpire : Date
})


userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)

});

// JWT Token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
};


// Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){

    try{
    return await bcrypt.compare(enteredPassword, this.password)
    }
    catch(err){
        console.log(err)
    }

} 

// Generating Password reset token
userSchema.methods.getResetPasswordToken = function(){

    // Generating Token 
    const resetToken = crypto.randomBytes(20).toString("Hex")

    // Hashing and adding resetPasswordToken to userSchema

    this.resetPasswordToken = crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex")

    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
}

module.exports = mongoose.model("User", userSchema)
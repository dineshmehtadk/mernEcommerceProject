

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors =require("../middleware/catchAsyncErrors")



const User = require("../models/userModel");
const sendToken = require("../utils/jwTokens");
const sendEmail = require("../utils/sendEmail") 
const crypto = require("crypto");
const cloudinary = require("cloudinary")


// Register a user 

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
   
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder : "avatars",
        width : 150,
        crop : "scale"
    })

    
    const {name, password, email} = req.body
   
    const user = await User.create({
        name,
        email,
        password,
        avatar :{
            public_id:"public_id",
            url : myCloud.secure_url,
            
        }
    })

    sendToken(user, 201, res)
})


// Login User 

exports.loginUser = catchAsyncErrors(async(req, res, next)=>{
    const {email, password} = req.body;


    // checking  if user given email and password 

    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password!", 400 ))
    }

    const user = await User.findOne({email}).select("+password");
    

    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    const isPasswordMatched = await user.comparePassword(password);
    
   

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password ", 401))
    }
    
    sendToken(user, 200, res)
})

// Logout  User

exports.logoutUser = catchAsyncErrors(async(req, res, next)=>{
    res.cookie("token", null,{
        expires : new Date(Date.now()),
        httpOnly : true,
    })
    res.status(200).json({
        success: true,
        message : "Logged Out"
    })
})

// forgot password

exports.forgotPassword = (async(req, res, next)=>{
   
 
    const user =  await User.findOne({email: req.body.email})
    

    if(!user){
        return next(new ErrorHandler("User not found", 404))
    }
    

    // Get ResetPassword Token
 
    const resetToken = user.getResetPasswordToken()
    await user.save({ validateBeforeSave : false })
    
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`

    const message = `Your password reset token is temp :- \n\n${resetPasswordUrl}\n\n If you have
    not requested this email, Please Ignore it`

 

    try{ 
        await sendEmail({
             email: user.email,
             subject :`Ecommerce Password Recovery`,
             message ,

        })
        res.status(200).json({
            success : true,
            message : `Email send to ${user.email} successfully! `

        })

    }
    catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))

    }
})

// Reset Password

exports.resetPassword = catchAsyncErrors(async(req, res, next)=>{
   
    // creating token hash 

    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire : {$gt : Date.now()}
    })
    if(!user){
        return next(
            new ErrorHandler(
                "Reset Password Token is invalid or has been expired", 400
            )
        )
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match!", 400))
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save()

    sendToken(user, 200, res)
})

// user Detail

exports.getUserDetails = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success : true,
        user
    })
})

// Update Use Password

exports.updatePassword = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatch){
        return next(new ErrorHandler("Old Password is incorrect", 400))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesn't match"))
    }

    user.password = req.body.newPassword;
    await user.save()

    sendToken(user, 200, res)
})


// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async(req, res, next)=>{
    const users = await User.find();

    res.status(200).json({
        success : true,
        users
    })

})

// Get Single user(admin)
exports.getSingleUser = catchAsyncErrors(async(req, res, next) =>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User doesn't exist with Id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})


// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
  
      
    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
  
      const imageId = user.avatar.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId);
  
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
  
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
  
    const temp = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    console.log(temp)
  
    res.status(200).json({
      success: true,
    });
  });

  // update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });

// Delete User  ------- Admin 

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});








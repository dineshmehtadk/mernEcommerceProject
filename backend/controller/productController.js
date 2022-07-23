 const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const apiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary")

// create products

exports.createProduct = catchAsyncErrors( async(req,res, next)=>{

    let images = [];
    if(typeof  req.body.images === "string"){
        images.push(req.body.images)
    }
    else{
        images = req.body.images
    }
 
    const imagesLink = []

    for(let i=0; i<images.length ; i++){
        const result = await cloudinary.v2.uploader.upload(images[i], 
          {
            folder : "products",
            width : 500,
            crop : "scale"
        })
       
        imagesLink.push({
            public_id : result.public_id,
            url : result.secure_url
        })
    }

    req.body.images = imagesLink;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
})


// Get all Product 

 exports.getAllProducts = catchAsyncErrors( async(req, res,) =>{

    const resultPerPage = 4;
    const productsCount = await Product.countDocuments();

     let apiFeature = new  apiFeatures(Product.find(), req.query).search().filter();
     let products = await apiFeature.query; 
     let filteredProductCount=products.length;
     let api = new apiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
      products = await api.query;
     
     res.status(200).json({
         success:true,
         products,
         productsCount,
         resultPerPage,
         filteredProductCount
     })
 })

// Update Product  --- admin

 exports.updateProduct  = catchAsyncErrors( async(req, res, next)=>{
     
     let product = await Product.findById(req.params.id);
     if(!product){
        return next(new ErrorHandler("Product not found!", 404))
    }

    let images = [];
    if(typeof  req.body.images === "string"){
        images.push(req.body.images)
    }
    else{
        images = req.body.images
    }

    if(images !== undefined){
           // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

    const imagesLink = []

    for(let i=0; i<images.length ; i++){
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder : "products"
        })
       
        imagesLink.push({
            public_id : result.public_id,
            url : result.secure_url
        })
    }

    req.body.images = imagesLink;

}
    
     
     product = await Product.findByIdAndUpdate(req.params.id, req.body,{
         new : true,
         runValidators:true,
         useFindAndModify :false

     })
     res.status(200).json({
         success:true,
         product
     })
 
 })

 // Delete Product  ---- admin 

 exports.deleteProduct = catchAsyncErrors( async(req, res,next)=>{
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
  
    await product.remove();
  
    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
  });

 

 // Get Product Detail 

 exports.getProductDetails = catchAsyncErrors( async (req,res,next)=>{
     //let validID = mongoose.Types.ObjectId.isValid(req.params.id);
     const product = await Product.findById(req.params.id)
     
     if(!product){
         return next(new ErrorHandler("Product not found!", 404))
     }
      //  const product = await Product.findById(req.params.id)
     res.status(200).json({
         success: true,
         product
     })
    
    
 })

 //  Create Review

 exports.createProductReview = (async(req, res, next)=>{
     const {rating, comment, productId} = req.body;
     

     const review = {
         user: req.user._id,
         rating: Number(rating),
         name : req.user.name,
         comment
          }
    
     const product = await Product.findById(productId);
    
     const isReviewed = product.review.find(
        (rev) => rev.user.toString() === req.user._id.toString()
      );
     
     
     if(isReviewed){
         product.review.forEach((rev)=>{
             if(rev.user.toString()=== req.user._id.toString())
             (rev.rating = rating), (rev.comment = comment)
  
         })

     }
     else{
         product.review.push(review);
         product.numOfReview = product.review.length
         
     }


     let avg = 0;

     product.review.forEach((rev =>{
       
         avg += rev.rating;
     }))
     
     product.ratings= avg/product.review.length

     await product.save({validateBeforesave:false})

     res.status(200).json({
         success:true,
               })
 })


// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
   
  
    res.status(200).json({
      success: true,
      reviews: product.review,
    });
  });


// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
    const numOfProducts = await Product.find().count();
  
    res.status(200).json({
      success: true,
      products,
      numOfProducts,
    });
  });

  exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const review = product.review.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    review.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (review.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / review.length;
    }
  
    const numOfReview = review.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        review,
        ratings,
        numOfReview,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });
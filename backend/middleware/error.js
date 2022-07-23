const ErrorHandler = require("../utils/errorHandler")


module.exports =(err, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    // wrong Mongodb ID 

    if(err.name === 'CastError'){
        const message = `Resource not found . Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400)
    }

    // Mongoose Duplicate key  error

    if(err.name === 110000){
        const message = `Duplicat ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400)
    }

    // Wrong JWT error 
    if(err.name === "JsonWebTokenError"){
        const message =`Json web token is Invalid, try again`
        err = new ErrorHandler(message, 400)
    }

    if(err.name === "TokenExpiredError"){
        const message = `Json web token is Expired, Try again`
        err = new ErrorHandler(message, 400)
    }


    res.status(err.statusCode).json({
        
        success:false,
        
        error: err.message,

    })


}
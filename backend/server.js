const app = require("./app")
const cloudinary = require("cloudinary")

const connectDatabase = require("./config/database")


// Handling uncaught Exception

process.on("uncaughtException",err=>{
    console.log(`Error: ${err.message}`)
    console.log("shutting down the server due to uncaughtException!")
    process.exit(1)
})



// config 
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"})
}



// connecting database

connectDatabase()

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,

})

    

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})


// unhandled Promise Rejections
process.on("unhandledRejection",err=>{
    console.log(`error: ${err.message}`)
    console.log(`shutting down the server due to unhandled Projection rejection`) 
    server.close(()=>{
        process.exit(1)
    }) 
})
import express, { urlencoded } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app=express();

//used cors as middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}   
))

app.use(express.json({ limit:"20kb" }))
app.use(express.urlencoded({ extended:true,limit:"20kb" }))
app.use(express.static("public"))
app.use(cookieParser())


//route imports
import userRoute from './routes/user.route.js'
import fitBlogs from './routes/blog.route.js'

//Decleration of Route
app.use("/api/v1/users",userRoute)
app.use("/api/v1/fitblogs",fitBlogs)


export{ app }
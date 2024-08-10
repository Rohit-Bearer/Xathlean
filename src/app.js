import express, { urlencoded } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import  globalError  from "./controllers/globalError.controller.js";
const app=express();

//used cors as middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials:true
}   
))

app.use(express.json({ limit:"20kb" }))
app.use(express.urlencoded({ extended:true,limit:"20kb" }))
app.use(express.static("public"))
app.use(cookieParser())
app.use(globalError)

//route imports
import userRoute from './routes/user.route.js'
import fitBlogs from './routes/blog.route.js'
import visitors from './routes/contact.route.js'

//Decleration of Route
app.use("/api/v1/users",userRoute)
app.use("/api/v1/fitblogs",fitBlogs)
app.use("/api/v1/contacts",visitors)

export{ app }
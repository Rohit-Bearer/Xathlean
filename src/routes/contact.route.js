import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router();

router.route("/visitor").post( (req,res)=>{
    res.send("Hi this is visitor response")
})

export default router

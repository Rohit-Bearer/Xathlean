import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
import { postBlog } from "../controllers/blogs.controller.js";



const router=Router();

router.route("/post").post(
    verifyJWT,
    upload.single('imageURL'),
    postBlog
)

export default router;
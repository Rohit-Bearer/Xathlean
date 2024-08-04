
//This utility js used to handle the request before computing or operation at server
/*requestHandler
const asyncHandler=(fn)=>{
    async(req,res,next)=>{
        try {
          await  fn(req,res,next)
        } catch (err) {
            res.status(err.code || 500 ).json(
                {
                    success:false,
                    message:err.message
                }
            )
        }
    }

}
*/
//  OR we can use this code using promise 

const asyncHandler=(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}


export {asyncHandler}

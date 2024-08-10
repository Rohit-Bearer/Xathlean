/*
class ApiError extends Error{

    constructor(
        statuscode,
        message="Went something wrong",
        errors=[],
        stack="" 
    ){
        super(message)
        this.statuscode=statuscode
        this.data=null
        this.message=message
        this.success=false
        this.errors=errors

    }



}
*/
class ApiError extends Error{

    constructor(statusCode,message,){
        super(message);
        this.statusCode=statusCode;
        this.status=statusCode>=400 && statusCode <500 ? 'fail' : 'error';

        this.isOperational=true;
        Error.captureStackTrace(this,this.constructor);

    }
}


export{ApiError}
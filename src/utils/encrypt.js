import bcrypt from "bcrypt"
import { ApiError } from "./ApiError.js";
import jwt from 'jsonwebtoken';
//const { jwt } = pkg;
// Function to hash a password
async function encryptPassword(password) {
    try {
        const saltRounds = 10; // Number of salt rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
    }
}

// Function to verify the password
async function isPasswordCorrect(loginpassword,registeredPassword) {
    try {
        const verifiedPassword = await bcrypt.compare(loginpassword,registeredPassword);
        return verifiedPassword;
    } catch (error) {
        console.error('Error password is not correct:', error);
    }
}



// Function to generate Token
async function generateToken(userDetails) {

    try {
        console.log(userDetails)
        console.log(process.env.ACCESS_TOKEN_EXPIRY)
        return jwt.sign(
            userDetails,
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRE || 1800
            }
        )
    } catch (error) {

        console.error('Error in generating Access Token: ',error);
        throw new ApiError(500,"Some thing went wrong while generating Access Token...")
        
    }
    
}


export {
    encryptPassword,
    isPasswordCorrect,
    generateToken,
}
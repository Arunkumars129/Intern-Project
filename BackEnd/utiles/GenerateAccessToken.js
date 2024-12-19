import jwt from "jsonwebtoken";

const generateAccessToken = (res,userId) =>{
    const isProduction = process.env.NODE_ENV 
    const AccessToken = jwt.sign({userId},process.env.ACCESS_SECRET_KEY,{expiresIn : "1d"})

   // store token in cookie
    res.cookie("AccessToken",AccessToken,{
        httpOnly : true,
        secure : isProduction,
        maxAge : 24 * 3600000,
        sameSite : isProduction ? "strict" : "lax"
    })
   
    return AccessToken
    
}

export default generateAccessToken;
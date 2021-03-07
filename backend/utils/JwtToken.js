const sendToken = (user , statusCode , res)=>{
    // create JWT 
    const token = user.getJwtToken();

    //options for cookie 
    const options = {
        expires : new Date(
            Date.now() + 24*3600*1000
        ) ,
        httpOnly : true 
    }
    // send cookie with token 
     res.status(statusCode).cookie('token' , token , options).json({
         success : true ,
         token ,
         user
     })
}
module.exports = sendToken
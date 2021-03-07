const User = require('../models/user')
const jwt = require("jsonwebtoken")
const errorHandler = require("../utils/errorHandler")
const asyncErrors = require('./catchAsyncErrors')

exports.isAuth = asyncErrors( async(req , res , next) => {
    // get the cookie which store token from req 
    const { token } = req.cookies ;
    // check if there is a token 
    if(!token){
        return next(new errorHandler("User doesn't have access permission .. You must login first" , 401))
    }
    // verify token 
    const decoded = jwt.verify(token , "SDSDSDSDDSFDFD65656DFFD" );
    // pass user by find it's id 
    req.user = await User.findById(decoded.id);
    next()
})
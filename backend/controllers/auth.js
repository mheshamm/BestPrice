const User = require('../models/user')
const ErrorHandler = require("../utils/errorHandler")
const AsyncErrors = require("../middlewares/catchAsyncErrors")
const sendToken = require('../utils/JwtToken')

exports.registerUser = AsyncErrors(async (req , res , next) =>{
    // get data from req
    const {name , email , password} = req.body ;
    const user = await User.create({
        name,
        email,
        password,
        avatar : {
            public_id : "ss" ,
            url : "https://www.pinclipart.com/picdir/big/559-5594866_necktie-drawing-vector-round-avatar-user-icon-png.png"
        }
    })
    sendToken(user , 200 , res)
    

})

exports.loginUser = AsyncErrors( async(req,res, next) => {
    // get email and pass from req 
    const {email , password} = req.body ;
    // check if user entered a mail or pass
    if(!email || !password){
        next(new ErrorHandler("Please enter Email or password") , 400)
    }
    // finding user in mongo db 
    const user = await User.findOne({email}).select('+password')
    // check if user exist 
    if(!user){
        return next(new ErrorHandler("Invalid USer ") , 401)
    }
    //check if pass is correct using the compare pass method in user model 
     const isPassMatched = await user.comparePass(password)
     if(!isPassMatched){
        return next(new ErrorHandler("Invalid Password ") , 401)
    }
    // send a token fron sendtoken()
    sendToken(user , 200 , res)


})
exports.getUser = AsyncErrors(async(req,res, next) =>{
    // get the user logged by pass it's id
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success : true,
        user
    })
})

exports.logOut = AsyncErrors(async(req,res,next)=>{
    // send response with token cookie and set it  null and make expires now 
    // then add it to route 
    res.cookie('token' , null , {
        expiers : new Date(Date.now()) ,
        httponly : true 
    })
    res.status(200).json({
        success : true ,
        message : "logged out successfully "
    })
})
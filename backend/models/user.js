const mongoose = require('mongoose');
const vaildator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [vaildator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
        // select mean to disable show the password 
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})
// make pass ecrypted before user saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})
//compare passwords
userSchema.methods.comparePass = async function (enteredPass){
    // هيقارن بين الباسورد اللي اليوزر دخله و الباسورد الاصلي
    return await bcrypt.compare(enteredPass , this.password)
}
// generate JWT using jwt module
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, "SDSDSDSDDSFDFD65656DFFD", {
        expiresIn: 60
    });
}

module.exports = mongoose.model('User' , userSchema )
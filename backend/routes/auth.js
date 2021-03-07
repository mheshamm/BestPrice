const express = require("express");
const router = express.Router();
const { isAuth } = require('../middlewares/auth')

const { registerUser , loginUser , logOut , getUser  } = require('../controllers/auth');

router.route("/register").post(registerUser)
router.route("/login").post(loginUser);
router.route("/me").get(isAuth , getUser);
router.route("/logout").get(logOut)

module.exports = router ;
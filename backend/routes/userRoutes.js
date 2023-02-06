const express =  require("express");
const {authController, getUserProfile,registerUser, updateUserProfile}  = require('../controller/userController');
const router = express.Router();
const {protected} = require('../middlewares/authMiddleware');

/* Register User */
router.route('/register').post(registerUser);

/* Authentication and Authorization for login */
router.route("/login").post(authController);

/* Get User Profile */
router.route("/profile").get(protected,getUserProfile).put(protected,updateUserProfile);


module.exports = router;
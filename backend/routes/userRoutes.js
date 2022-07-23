const express = require("express");
const{ registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, deleteUser, updateUserRole } = require("../controller/userController");

const {isAuthenticatedUser, autharizeRole} =require("../middleware/auth")

const router  = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser) 
router.route("/password/forget").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logoutUser)
router.route("/me").get(isAuthenticatedUser ,getUserDetails)
router.route("/me/update").put(isAuthenticatedUser,autharizeRole("admin"), updateProfile)
router.route("/password/update").put(isAuthenticatedUser,autharizeRole("admin"), updatePassword)

router.route("/admin/users").get(isAuthenticatedUser,autharizeRole("admin"), getAllUser)
router.route("/admin/user/:id").get(isAuthenticatedUser, getSingleUser).put(isAuthenticatedUser, autharizeRole("admin"), updateUserRole)
.delete(isAuthenticatedUser, autharizeRole("admin"), deleteUser);
module.exports = router;


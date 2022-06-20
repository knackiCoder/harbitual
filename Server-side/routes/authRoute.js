const express = require("express");
const router = express.Router();


const {
    Register,
    verifyEmail,
    login,
    logout,
    handleRefreshToken
} = require("../controller/authController");

const authenticateUser = require("../middleware/authenticated")


router.post("/register", Register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", handleRefreshToken);


module.exports = router;
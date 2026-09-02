const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const optionalAuth = require("../middleware/optionalAuth")
const {getProfileById,updateUserById,deleteUserById} = require("../controllers/userController")

router.get("/profile/:id", optionalAuth,getProfileById)
router.put("/update",verifyToken,updateUserById);
router.delete("/delete",verifyToken,deleteUserById);

module.exports = router;
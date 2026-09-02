const express = require ("express");
const router = express.Router();
const {registerUser, getAllUsers, getUserById, updateUserById, deleteUserById, loginUser, getProfileById} = require("../controllers/authController")
const verifyToken = require("../middleware/verifyToken");
const optionalAuth = require("../middleware/optionalAuth");

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/users",getAllUsers);
router.get("/profile/:id", optionalAuth,getProfileById)
router.get("/:id",verifyToken,getUserById);
router.put("/update",verifyToken,updateUserById);
router.delete("/delete",verifyToken,deleteUserById);

module.exports = router;



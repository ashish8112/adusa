const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken")
const optionalAuth = require("../middleware/optionalAuth")
const {createPost,getFeed,toggleLike} = require("../controllers/postController")

router.post("/",verifyToken,createPost);
router.get("/",optionalAuth,getFeed);
router.post("/:id/like",verifyToken,toggleLike)

module.exports=router;
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken")
const {createPost,getFeed,toggleLike,checkLike} = require("../controllers/postController")

router.post("/",verifyToken,createPost);
router.get("/",getFeed);
router.post("/:id/like",verifyToken,toggleLike)
router.get("/:id/check",verifyToken,checkLike);

module.exports=router;
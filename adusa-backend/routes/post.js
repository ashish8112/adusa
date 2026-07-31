const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken")
const {createPost,getFeed} = require("../controllers/postController")

router.post("/",verifyToken,createPost);
router.get("/",getFeed);

module.exports=router;
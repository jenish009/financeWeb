const express = require("express");
const router = express.Router();
const { postController } = require("../controllers");

router
    .post("/createPost", postController.createPost)
    .get("/getPosts", postController.getPosts)
    .get("/getPostById", postController.getPostById)



module.exports = router;

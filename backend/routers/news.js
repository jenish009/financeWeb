const express = require("express");
const router = express.Router();
const { newsController } = require("../controllers");

router
    .post("/createNews", newsController.createNews)
    .get("/getAllNews", newsController.getAllNews)
    .get("/getNewsById", newsController.getNewsById)



module.exports = router;

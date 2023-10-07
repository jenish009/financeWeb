const express = require("express");
const router = express.Router();
const { taskController } = require("../controllers");

router
    .post("/getUserTask", taskController.getUserTask)
    .post("/createUserTask", taskController.createUserTask)


module.exports = router;

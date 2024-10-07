const express = require("express");
const { createTaskApi, getAllTaskApi, updateTaskApi, deleteTaskApi } = require("../controllers/TaskController");

const router = express.Router();

router.post("/createTask", createTaskApi);
router.get("/getTask", getAllTaskApi);
router.put("/updateTask/:id", updateTaskApi);
router.delete("/deleteTask/:id", deleteTaskApi);

module.exports = router;
const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.get("/", todoController.getAllTodos);
router.get("/search", todoController.searchTodos);
router.post("/create", todoController.createTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);
router.patch("/:id/complete", todoController.markAsCompleted);

module.exports = router;
const express = require("express");
const ItemsController = require("../controllers/ItemsController");
const itemsRouter = express.Router();

itemsRouter.post("/todos", ItemsController.postTodos);
itemsRouter.get("/todos", ItemsController.getTodos);
itemsRouter.delete("/todos/:id", ItemsController.deleteTodos);
itemsRouter.patch("/todos/:id", ItemsController.patchTodos);

module.exports = itemsRouter;

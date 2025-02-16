const todoItems = require("../models/TodoItem");

exports.postTodos = async (req, res, next) => {
  try {
    const newTodoItems = new todoItems(req.body);
    const addItems = await newTodoItems.save();
    res.status(201).json(addItems);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
exports.getTodos = async (req, res, next) => {
  try {
    const items = await todoItems.find();
    res.json(items);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
exports.deleteTodos = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedItem = await todoItems.findByIdAndDelete(id);
    res.json(deletedItem);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
exports.patchTodos = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedItem = await todoItems.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedItem);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

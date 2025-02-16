const express = require("express");
const geminiController = require("../controllers/geminiController");  // Ensure the path is correct
const geminiRouter = express.Router();

geminiRouter.get("/conversation", geminiController.getConversation);
geminiRouter.post("/conversation", geminiController.newConversation);
geminiRouter.put("/conversation/:id", geminiController.newMessage);
geminiRouter.delete("/conversation/:id", geminiController.deleteConversation);  // This should not be undefined

module.exports = geminiRouter;

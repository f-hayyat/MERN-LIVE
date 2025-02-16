const { generateContent, generateTitle } = require("../services/geminiService");
const geminiConversation = require("../models/geminiConversation");

exports.newConversation = async (req, res, next) => {
  try {
    const { prompt, model } = req.body;
    const content = await generateContent(prompt, model);
    const messages = [
      { role: "user", content: prompt },
      { role: "assistant", content: content },
    ];
    const title = await generateTitle(messages);

    const conversation = new geminiConversation({ title, model, messages });
    await conversation.save();
    res.status(201).json(conversation);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.getConversation = async (req, res, next) => {
  const conversation = await geminiConversation.find();
  res.status(200).json(conversation);
};
exports.newMessage = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    const { id } = req.params;
    const existingConversation = await geminiConversation.findById(id);
    if (!existingConversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    const content = await generateContent(
      prompt,
      existingConversation.model,
      existingConversation.messages
    );
    existingConversation.messages.push(
      { role: "user", content: prompt },
      { role: "assistant", content: content }
    );
    await existingConversation.save();
    res.json(existingConversation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteConversation = async (req, res, next) => {
  const { id } = req.params;
  await geminiConversation.findByIdAndDelete(id);
  res.status(204).json({ message: "Conversation deleted" });
};

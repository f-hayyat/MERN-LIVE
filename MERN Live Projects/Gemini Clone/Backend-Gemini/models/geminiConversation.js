const mongoose = require('mongoose');

const geminiConversationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    model : { type: String, required: true},
    startTime: { type: String, required: true, default: Date.now },
    messages: [
        {
            role : { type: String, required: true},
            content : { type: String, required: true},
            
        }
    ]
 
});

module.exports = mongoose.model('geminiConversation', geminiConversationSchema);
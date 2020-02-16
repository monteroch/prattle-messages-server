const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    _id:{
        type: String,
        required: true
    },
    conversationId:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    createdAt:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
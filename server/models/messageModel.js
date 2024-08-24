const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiverId: { // Changed spelling from 'recieverId' to 'receiverId'
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message; // Exporting directly

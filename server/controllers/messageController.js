const Conversation = require('../models/conversationModel.js');
const Message = require('../models/messageModel.js');
const { getReceiverSocketId,io } = require('../soket/socket.js');

module.exports.sendMessage = async (req, res) => {
    try {
        const senderId = req.userId;
        const receiverId = req.params.id;
        const { message } = req.body;


        // Find or create a conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [] // Initialize with an empty messages array
            });
        }

        // Create a new message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        // Add the new message to the conversation
        if(newMessage){
            conversation.messages.push(newMessage._id);
        };
        

        await Promise.all([conversation.save(), newMessage.save()]);
        //socket.io
        const receiverSocketId =getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        return res.status(201).json(newMessage);
    } catch (error) {
        console.error(error); // Log the error message for debugging
        return res.status(500).json({ message: "Internal Server Error" }); // Respond with a server error status
    }
};




module.exports.getmessages=async (req,res) =>{
    try {
        const senderId = req.userId;
        const receiverId = req.params.id;
        const conversation= await Conversation.findOne({
           participants: {$all :[senderId,receiverId]
           } 
        }).populate('messages');
        // console.log(conversation);
        res.status(200).json(conversation ?.messages);
    } catch (error) {
        
    }
}
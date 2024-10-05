const Conversation = require('../models/conversationModel.js'); // Imports the Conversation model to interact with the conversation data in the database.
const Message = require('../models/messageModel.js'); // Imports the Message model to interact with the message data in the database.
const { getReceiverSocketId, io } = require('../soket/socket.js'); // Imports the getReceiverSocketId function and io instance for socket operations.

module.exports.sendMessage = async (req, res) => { // Defines an async function `sendMessage` to handle sending a message and exports it.
    try { // Begins a try block to handle potential errors.
        const senderId = req.userId; // Retrieves the sender's user ID from the request object.
        const receiverId = req.params.id; // Retrieves the receiver's user ID from the request parameters.
        const { message } = req.body; // Destructures the `message` from the request body.

        // Find or create a conversation
        let conversation = await Conversation.findOne({ // Finds a conversation with both sender and receiver as participants.
            participants: { $all: [senderId, receiverId] } 
        });

        if (!conversation) { // Checks if no existing conversation is found.
            conversation = await Conversation.create({ // Creates a new conversation document if it doesn't exist.
                participants: [senderId, receiverId],
                messages: [] // Initializes with an empty messages array.
            });
        }

        // Create a new message
        const newMessage = await Message.create({ // Creates a new message document with the sender's ID, receiver's ID, and message content.
            senderId,
            receiverId,
            message
        });

        // Add the new message to the conversation
        if (newMessage) { // Checks if the new message was created successfully.
            conversation.messages.push(newMessage._id); // Adds the new message ID to the conversation's messages array.
        }

        await Promise.all([conversation.save(), newMessage.save()]); // Saves both the updated conversation and new message to the database.

        //socket.io
        const receiverSocketId = getReceiverSocketId(receiverId); // Gets the socket ID of the receiver.
        if (receiverSocketId) { // Checks if the receiver has an active socket connection.
            io.to(receiverSocketId).emit("newMessage", newMessage); // Emits a "newMessage" event to the receiver's socket with the new message data.
        }

        return res.status(201).json(newMessage); // Sends a response with status 201 (Created) and the new message data in JSON format.
    } catch (error) { // Catches any errors that occur in the try block.
        console.error(error); // Logs the error message for debugging.
        return res.status(500).json({ message: "Internal Server Error" }); // Responds with status 500 (Internal Server Error) and an error message.
    }
};

module.exports.getmessages = async (req, res) => { // Defines an async function `getmessages` to handle fetching messages and exports it.
    try { // Begins a try block to handle potential errors.
        const senderId = req.userId; // Retrieves the sender's user ID from the request object.
        const receiverId = req.params.id; // Retrieves the receiver's user ID from the request parameters.

        const conversation = await Conversation.findOne({ // Finds the conversation with both sender and receiver as participants.
           participants: { $all: [senderId, receiverId] } 
        }).populate('messages'); // Populates the `messages` field with the actual message documents.

        // console.log(conversation); // Uncomment this line to log the conversation data for debugging.

        res.status(200).json(conversation?.messages); // Sends a response with status 200 (OK) and the messages from the conversation in JSON format.
    } catch (error) { // Catches any errors that occur in the try block.
        // Currently, there is no error handling or response in this block, so it is empty.
    }
};

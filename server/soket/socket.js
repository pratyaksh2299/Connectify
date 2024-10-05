const { Server } = require('socket.io'); // Imports the Server class from the 'socket.io' module.
const http = require('http'); // Imports the 'http' module for creating an HTTP server.
const express = require('express'); // Imports the 'express' module for creating an Express application.

const app = express(); // Creates an Express application instance.
const server = http.createServer(app); // Creates an HTTP server that uses the Express application.

const io = new Server(server, { // Creates a new Socket.IO server instance, attaching it to the HTTP server.
    cors: { // Configures CORS (Cross-Origin Resource Sharing) for the Socket.IO server.
        origin: ['http://localhost:5173'], // Allows connections from this origin.
        methods: ['GET', 'POST'], // Specifies allowed HTTP methods.
    },
});

getReceiverSocketId = (receiverId) => { // Defines a function to get the socket ID of a receiver based on their user ID.
    return usersocketMap[receiverId]; // Returns the socket ID from the usersocketMap for the given receiverId.
}

// Store online users
const usersocketMap = {}; // Initializes an object to keep track of online users and their corresponding socket IDs.

io.on('connection', (socket) => { // Sets up an event listener for new Socket.IO connections.
    // console.log('User connected:', socket.id); // Logs the ID of the connected user.

    // Get userId from query parameters
    const userId = socket.handshake.query.userId; // Retrieves the userId from the connection's query parameters.

    if (userId) { 
       
        usersocketMap[userId] = socket.id; // Maps the userId to the socket ID in the usersocketMap.
    }

    // Emit all online users to the frontend
    io.emit('getonlineUsers', Object.keys(usersocketMap)); // Emits an event 'getonlineUsers' with the list of online user IDs to all connected clients.

    // Handle user disconnection
    socket.on('disconnect', () => { // Sets up an event listener for when a user disconnects.
        // console.log('User disconnected:', socket.id); // Logs the ID of the disconnected user.

        // Remove user from the map if userId exists
        const disconnectedUserId = Object.keys(usersocketMap).find(id => usersocketMap[id] === socket.id); // Finds the userId associated with the disconnected socket ID.
        if (disconnectedUserId) { // Checks if the userId was found.
            delete usersocketMap[disconnectedUserId]; // Removes the user from the usersocketMap.
        }

        // Emit updated list of online users
        io.emit('getonlineUsers', Object.keys(usersocketMap)); // Emits an event 'getonlineUsers' with the updated list of online user IDs to all connected clients.
    });
});

module.exports = { app, io, server, getReceiverSocketId }; // Exports the app, io instance, server, and getReceiverSocketId function for use in other files.

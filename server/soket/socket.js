const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST'],
    },
});
getReceiverSocketId = (receiverId) => {
    return usersocketMap[receiverId];
}
// Store online users
const usersocketMap = {};

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Get userId from query parameters
    const userId = socket.handshake.query.userId;

    if (userId) {
        // Add user to the map
        usersocketMap[userId] = socket.id;
    }

    // Emit all online users to the frontend
    io.emit('getonlineUsers', Object.keys(usersocketMap));

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);

        // Remove user from the map if userId exists
        const disconnectedUserId = Object.keys(usersocketMap).find(id => usersocketMap[id] === socket.id);
        if (disconnectedUserId) {
            delete usersocketMap[disconnectedUserId];
        }

        // Emit updated list of online users
        io.emit('getonlineUsers', Object.keys(usersocketMap));
    });
});

module.exports = { app, io, server,getReceiverSocketId };

const express = require('express');
const { register, login, logout, getOtherUsers } = require("../controllers/userController.js");
const isAuthenticated = require('../middleware/isAuthenticated.js');

const router = express.Router();

// Register route
router.route('/register')
  .post(register);

// Login route
router.route('/login')
  .post(login);

// Logout route
router.route('/logout')
  .get(logout);

// Route to get other users, with authentication middleware
router.route('/')
  .get(isAuthenticated,getOtherUsers);

module.exports = router;

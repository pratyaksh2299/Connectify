const express=require('express');
const { sendMessage, getmessages } = require('../controllers/messageController');
const isAuthenticated = require('../middleware/isAuthenticated');

const router=express.Router();

router.route('/send/:id').post(isAuthenticated,sendMessage);
router.route('/:id').get(isAuthenticated,getmessages);

module.exports = router;
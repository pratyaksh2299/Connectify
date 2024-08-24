const User = require('../models/userModel'); // Import the User model to interact with the user collection in the database
const bcrypt = require('bcryptjs'); // Import bcrypt for hashing and comparing passwords
var jwt = require('jsonwebtoken'); // Import jsonwebtoken for creating and verifying JWT tokens

module.exports.register = async (req, res) => {
    try {
        const { fullname, username, password, confirmpassword, gender } = req.body; // Destructure required fields from the request body
        // console.log(req.body); // Log the request body to the console for debugging

        if (!fullname || !username || !password || !confirmpassword || !gender) { // Check if any required field is missing
            return res.status(400).json({ message: "All fields are required!" }); // Respond with an error message if any field is missing
        }

        if (password !== confirmpassword) { // Check if the password and confirm password fields match
            return res.status(400).json({ message: "Passwords do not match!" }); // Respond with an error message if passwords do not match
        }

        const existingUser = await User.findOne({ username }); // Check if a user with the provided username already exists
        if (existingUser) { // If a user is found
            return res.status(400).json({ message: "User already exists!" }); // Respond with an error message indicating the user already exists
        }

        const malePhoto = `https://ui-avatars.com/api/?name=${username}`; // URL for male profile photos
        const femalePhoto = `https://ui-avatars.com/api/?name=${username}`; // URL for female profile photos

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the provided password with bcrypt using a salt round of 10

        await User.create({ // Create a new user in the database
            fullname,
            username,
            password: hashedPassword,
            profilephoto: gender === "male" ? malePhoto : femalePhoto, // Set the profile photo URL based on the user's gender
            gender
        });

        return res.status(201).json({ message: "Account created successfully", success: true }); // Respond with success message after successful registration
    } catch (error) { // Catch any errors that occur during the process
        console.error("Error in registration:", error); // Log the error to the console for debugging
        return res.status(500).json({ message: "Internal Server Error" }); // Respond with a server error message
    }
};

module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body; // Destructure username and password from the request body

        if (!username || !password) { // Check if username and password are provided
            return res.status(400).json({ message: 'All fields are required!', success: false }); // Respond with an error message if fields are missing
        }

        const user = await User.findOne({ username }); // Find the user by username
        if (!user) { // If no user is found
            return res.status(400).json({ message: 'Username or password is incorrect!', success: false }); // Respond with an error message indicating incorrect username or password
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password); // Compare the provided password with the stored hashed password
        if (!isPasswordMatch) { // If passwords do not match
            return res.status(400).json({ message: 'Username or password is incorrect!', success: false }); // Respond with an error message indicating incorrect username or password
        }

        const tokenData = { userId: user._id }; // Create a token payload with the user's ID
        const token =await  jwt.sign(tokenData, process.env.JWT_TOKEN_KEY, { expiresIn: '1d' }); // Generate a JWT token with a 1-day expiration
        console.log('login sucessfully!');
        // console.log(token);
        return res.status(200).cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({ // Set the token in a cookie and respond with user details
            _id: user._id,
            username: user.username, 
            fullname: user.fullname,
            profilephoto: user.profilephoto,
        });
    } catch (error) { // Catch any errors that occur during the login process
        console.error(error.message); // Log the error message to the console for debugging
        return res.status(500).json({ message: 'An error occurred during login', success: false }); // Respond with a server error message
    }
};

module.exports.logout = (req, res) => {
    try {
       return res.status(200).cookie('token', "", { maxAge: 0 }).json({ message: 'logout successfully' }); // Clear the token cookie and respond with a logout success message
    } catch (error) { // Catch any errors that occur during the logout process
        console.log('error'); // Log 'error' to the console for debugging
    }
};

module.exports.getOtherUsers = async (req, res) => {
    try {
        // Get the logged-in user's ID from the request
        const loggedUserId = req.userId; // Ensure `req.userId` is correctly set by the `isAuthenticated` middleware

        // Find users other than the logged-in user and exclude their passwords
        const otherUsers = await User.find({ _id: { $ne: loggedUserId } }).select("-password");

        // Respond with the list of other users
        return res.status(200).json( otherUsers);
    } catch (error) {
        // Catch and handle any errors that occur during the process
        console.error(error.message); // Log the error message to the console for debugging
        return res.status(500).json({ message: 'An error occurred while fetching users' }); // Respond with a server error status
    }
};

const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  try {
    // Retrieve the token from cookies
    const token = req.cookies.token;
    // console.log(token);
    // Check if the token is provided
    if (!token) {
      return res.status(401).json({ message: 'You are not authorized' });
    }

    // Verify the token
    const decoded = await jwt.verify(token, process.env.JWT_TOKEN_KEY);
    if(!decoded){
      return res.status(401).json({ message: 'Invailid Token' });
    }
      // console.log(decode);
    // If token is invalid or expired, `jwt.verify` will throw an error, which will be caught by the catch block.
    req.userId = decoded.userId; // or `req.id = decoded.userId;` if you prefer

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'You are not authorized' });
  }
};
module.exports= isAuthenticated;
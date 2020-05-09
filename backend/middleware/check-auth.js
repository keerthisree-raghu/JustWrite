const jwt = require("jsonwebtoken");

// Check if a token exists
// Check if it is the correct token
module.exports = (req, res, next) => {
    try{
        // "Bearer Some_Random_String"
        const token = req.headers.authorization.split(" ")[1];
        // Verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = {
            email: decodedToken.email,
            userId: decodedToken.userId
        }; 
        // Moves to next middleware only if validated
        next();
    }
    catch (error) {
        res.status(401).json({
            message: "You are not authenticated."
        });
    }
};
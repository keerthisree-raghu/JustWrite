const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "a_very_long_secret_string_of_some_sort");
        next();
    }
    catch (error) {
        res.status(401).json({
            message: "Authorization failed!"
        });
    }
};
// Encryption package
const bcrypt = require("bcryptjs");
// JSON Web Token package
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
    // hash(value to encrypt, salt)
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Configuring user with required properties 
            const user = new User({
                email: req.body.email,
                // password: req.body.password [N]
                password: hash // [Y]
            });
            // Save user to database
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: "User created!",
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: "Invalid authentication credentials."
                    });
                });
        });
}

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    // Finds user based on email address (unique value)
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Authentication failed!"
                });
            }
            // user object exists only in the first then block
            // We must assign it to a new variable
            fetchedUser = user;
            // Compare entered password with stored password
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Authentication failed!"
                });
            }
            // Creating new JSON Web Token
            // jwt.sign(input data of your choice, password/secret, configuration)
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            // After successful authentication
            res.status(200).json({
                // Set token
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Invalid authentication credentials."
            });
        });
}
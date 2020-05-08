const express = require("express");

const UserController = require("../controllers/user-controller");

const router = express.Router();

// Create user registration route - filter to user-controller.js
router.post("/register", UserController.createUser);

// Create user login route - filter to user-controller.js
router.post("/login", UserController.userLogin);

module.exports = router;
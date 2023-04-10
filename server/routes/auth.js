const express = require('express');

const authRouter = express.Router();

const authAction = require('../controllers/auth');

// Route-handling goes here

authRouter.get('/', authAction.getAuth);

// Register

authRouter.post('/register', authAction.registerUser);

// Log In

authRouter.post('/login', authAction.loginUser);

// Dummy Route

authRouter.post('/getAuth', authAction.getAuth);


module.exports = authRouter;
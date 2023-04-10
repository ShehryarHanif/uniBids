const express = require('express');

const router = express.Router();

const authRouter = require('./auth');
const actionRouter = require('./action');

// Any endpoint that starts with /auth is directed to authRouter

router.use('/auth', authRouter);

// Any endpoint that starts with "/action" is directed to actionRouter

router.use('/action', actionRouter);

module.exports = router;
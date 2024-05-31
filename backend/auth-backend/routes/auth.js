const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).send({ token });
    } catch (error) {
        res.status(400).send({ error: 'Username already in use' });
    }
});

// Signin route
router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).send({ error: 'Invalid username or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(400).send({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
});

module.exports = router;

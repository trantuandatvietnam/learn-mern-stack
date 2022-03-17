const express = require('express');
const User = require('../models/User');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');
require('dotenv').config();

// @route GET /api/auth/
// @desc check user is login
// access public
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// @route POST /api/auth/register
// @desc REGISTER user
// access public
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // simple validation
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'missing username/ password' });
    }
    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                success: false,
                message:
                    'user is already registered! please enter different username',
            });
        }
        // //if all good
        const hashPassword = await argon2.hash(password);
        const newUser = new User({ username, password: hashPassword });
        await newUser.save();
        // return token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET
        );
        res.json({ success: true, accessToken });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// @route POST /api/auth/login
// @desc REGISTER user
// access public
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // simple validation
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'missing username/ password' });
    }

    try {
        // check for existing user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'password or username is incorrect',
            });
        }
        // username found
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: 'password or username is incorrect',
            });
        }
        // all good
        // return token
        // return token
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        );
        res.json({ success: true, accessToken });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

module.exports = router;

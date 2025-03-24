const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const register = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(401).json({
                error: 'An account with this email exists already'
            });
        }
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({
            message: 'Account created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                error: 'Wrong email and/or password'
            });
        }
        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (!passwordsMatch) {
            return res.status(401).json({
                error: 'Wrong email and/or password'
            });
        }
        user.password = undefined;
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
        res.status(200).json({
            message: `Welcome ${user.firstName}`,
            user,
            token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const loadUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.json({user});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    register,
    login,
    loadUser
}
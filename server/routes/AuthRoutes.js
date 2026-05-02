const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

router.post("/register", async (req, res) => {
      try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                  return res.status(400).json({ message: "All fields required" });
            }
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                  return res.status(400).json({ message: "User already exists" });
            }
            const hashed = await bcrypt.hash(password, 10);
            const user = await User.create({
                  name,
                  email,
                  password: hashed
            });
            res.status(200).json({ message: "User registered" });
      }
      catch (error) {
            res.status(500).json({ message: error.message });
      }
});

router.post("/login", async (req, res) => {
      try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                  return res.status(404).json({ message: "User not found" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                  return res.status(400).json({ message: "Invalid credentials" });
            }
            const token = jwt.sign({
                  id: user._id,
                  role: user.role
            }, process.env.JWT_SECRET, {
                  expiresIn: "1d"
            });
            res.status(200).json({ token, role: user.role });
      }
      catch (error) {
            res.status(500).json({ message: error.message });
      }
});

module.exports = router;
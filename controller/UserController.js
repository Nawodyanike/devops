const User = require('../model/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// ----------------- SIGNUP -----------------
const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    console.log(fullName, email, password);
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const savedUser = await User.create({
      fullName,
      email,
      passwordHash,
    });

    res.status(201).json({
      message: 'User created successfully',
      data: {
        fullName: savedUser.fullName,
        email: savedUser.email,
      },
    });
  } catch (e) {
    console.error('Signup error:', e);
    res.status(500).json({ message: 'Signup error', error: e.message });
  }
};

// ----------------- LOGIN -----------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const selectedUser = await User.findOne({ email });
    if (!selectedUser) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, selectedUser.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: selectedUser.email, id: selectedUser._id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        fullName: selectedUser.fullName,
        email: selectedUser.email,
      },
    });
  } catch (e) {
    console.error('Login error:', e);
    res.status(500).json({ message: 'Login error', error: e.message });
  }
};

module.exports = {
  signup,
  login,
};

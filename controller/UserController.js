const User = require('../model/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const signup = async (req, res) => {
    try{

        const {fullName, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({'message': 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const savedUser= await User.create({
            fullName,
            email,
            hashedPassword,
        });
        res.status(201).json({'message': 'User created successfully', data: savedUser});
    }
    catch (e)
    {
        res.status(500).json({'message': 'signup error', 'error': e});
        
    }
};

const login = async (req, res) => {
    try{

        const {email, password} = req.body;
        const selecteduser = await User.findOne({email});
        if(!selecteduser){
            return res.status(400).json({'message': 'User does not exist'});

          const ispasswordvalid =  await bcrypt.compare(password, selecteduser.passwordHash);
          if(!ispasswordvalid){
            return res.status(400).json({'message': 'Invalid password'});

            const token = jwt.sign({email: selecteduser.email, id: selecteduser._id}, JWT_SECRET, {expiresIn: '1h'});
            res.status(200).json({'message': 'Login successful', token:token});
        }

     }} catch (e)
    {
        res.status(500).json({'message': 'login error', 'error': e});
    }
}

module.exports = {
    signup,
    login,
};
const asyncHandler = require('express-async-handler');
const bCrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

//@desc Register a new user
//@route /api/users
//@access Public
const registerUser = asyncHandler(async(req: any, res: any) => {
  const { name, email, password } = req.body;

  //validations:
  if (!name || !email || !password) {
    res.status(400).json({ message: "Please include all fields." });
  }

  //Find if user exists already:
  const userExists = await User.findOne({ email });

  if(userExists) {
    res.status(400)
    throw new Error('User already exists!');
  }

  //hash password:
  const salt = await bCrypt.genSalt(10);
  const hashedPass = await bCrypt.hash(password, salt);

  //create user: 
  const user = await User.create({
    name, email, password: hashedPass
  })

  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email:user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data')
  }

});

//@desc Login a user
//@route /api/users/login
//@access Public
const loginUser = asyncHandler(async(req: any, res: any) => {
  const { email, password } = req.body;

  //validations:
  if (!email || !password) {
    res.status(400).json({ message: "Please include all fields." });
  }

  //Find if user exists already:
  const user = await User.findOne({ email });

  //check user & passwords match
  if(user && (await bCrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email:user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401);
    throw new Error('Invalid credentials')
  }

  res.send("Login Route");
});

//@desc Get a current user
//@route /api/users/me
//@access Private
const getMe = asyncHandler(async(req: any, res: any) => {
  const user = { 
    id: req.user._id,
    name: req.user.name,
    email:req.user.email
   }
    
  res.status(200).json(user)
})

//generate token:
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}


module.exports = { registerUser, loginUser, getMe };

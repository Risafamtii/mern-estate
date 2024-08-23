import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (username, email, password) are required",
      });
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create the new user object
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a token using the new user's ID
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    // Set the token as a cookie and respond with the user info
    res.cookie('access_token', token, { httpOnly: true }).status(200).json({
      success: true,
      message: "User created successfully",
      user: newUser, // You can include the user details in the response if needed
    });

  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User Not Found!'));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    // Generate a token if the credentials are correct
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const {password:pass ,...rest} =validUser._doc;
    // Set the token as a cookie and respond with user info
    res
    .cookie('access_token', token, { httpOnly: true })
    .status(200)
    .json(rest);
      // success: true,
      // message: "Signed in successfully",
      // user: validUser,
    

  } catch (error) {
    next(error);
  }
};

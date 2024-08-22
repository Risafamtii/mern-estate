import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

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

    // Respond with success
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

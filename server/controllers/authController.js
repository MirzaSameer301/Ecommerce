import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUserEmail = await User.findOne({ email });
    const checkUserName = await User.findOne({ userName });
    if (checkUserEmail) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
    if (checkUserName) {
      return res.json({
        success: false,
        message: "This User Name is already taken",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "Incorrect Credentials",
      });
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.json({
        success: false,
        message: "Incorrect Credentials",
      });
    }
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );
    res.cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: "Logged in Successfully",
      user: {
        userName: checkUser.userName,
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
      },
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logout Successfully",
  });
};

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }
  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }
};

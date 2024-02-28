import User from "../model/userModel.js";
import asyncHandler from "express-async-handler";
import {
  generateToken,
  authTokenVerification,
} from "../utils/generateToken.js";

// Register Api:

const register = asyncHandler(async (req, res) => {
  const { username, mobile,email, password, image } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User is already exist");
  }

  const user = await User.create({
    username,
    mobile,
    email,
    password,
    image,
  });

  if (user) {
    const { password, ...info } = user._doc;
    res.status(201).json({
      status: "Successful Sign Up!",
      // ...info,
      user
    });
  } else {
    res.status(400);
    throw new Error("Invalid user Data");
  }
});

//login
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      status: "Please provide email and password",
    });
  }

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.status(201).json({
      status: "Successful login!",
      token,
    });
  } else {
    res.status(401).json({
      status: "Incorrect credentials",
    });
  }
});

//protected route

const protect = asyncHandler(async (req, res, next) => {
  let token = "";
  if (req.headers?.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401).json({
      status: "Not authorized",
    });
    throw new Error("Not authorized", 401); //401 means not authorised
  }
  const payload = await authTokenVerification(token);

  const userInfo = await User.findById(payload.id);

  if (!userInfo) {
    throw new Error("The user does not exist", 401);
  }
  req.user = userInfo;
  next();
});

// User must be an admin
// const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(401).send({ message: 'Invalid Admin Token' });
//   }
// };

//logout user
const logoutUser = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
});

res.status(200).json({
    success: true,
    message: "Logged Out",
});
  };

  //get user profile
  const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        mobile:user.mobile,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  })

  //update User Profile 
  const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      user.name = req.body.username || user.username;
      user.email = req.body.email || user.email;
  
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        mobile: updatedUser.mobile,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });
  
  
export { register, login, protect,logoutUser,getUserProfile,updateUserProfile};

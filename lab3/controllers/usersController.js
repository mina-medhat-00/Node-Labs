import { promisify } from "util";
import { isValidObjectId } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/usersModel.js";
import AppError from "../utils/appError.js";

// if i have a function that does not promise ,
// but given a callback function will act async,
// i need it to return promise

const signJwt = promisify(jwt.sign);

const register = async (req, res, next) => {
  try {
    const { body } = req;

    // hash password
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(body.password, SALT_ROUNDS);
    const user = await User.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    const returnedUser = {
      name: user.name,
      email: user.email,
      role: user.role,
      _id: user._id,
    };

    res.status(201).json({
      status: "Success",
      message: "User created successfully",
      data: returnedUser,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { body } = req;
    if (!body.email || !body.password) {
      throw new AppError("Email and password are required", 400);
    }

    // check if the user with this email exists
    const user = await User.findOne({ email: body.email });
    if (!user) {
      throw new AppError("Invalid email or password", 400);
    }
    // validate the incoming password with hashed password in db
    const isPasswordMatched = await bcrypt.compare(
      body.password,
      user.password
    );
    if (!isPasswordMatched) {
      throw new AppError("Invalid email or password", 400);
    }

    // generate jwt token
    const SECRET = process.env.JWT_SECRET;
    const payload = { id: user._id, role: user.role };
    const token = await signJwt(payload, SECRET, {
      expiresIn: "1d",
    });

    // send the token to the client
    res.status(200).json({
      status: "Success",
      message: "User logged in successfully",
      data: { token },
    });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find({}, { name: 1, email: 1 });

  res.status(200).json({
    status: "Success",
    message: "Users fetched successfully",
    data: users,
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new AppError("Invalid user id", 400);
  }

  //   const user = await User.findById(id);
  const user = await User.findOne({ _id: id }, { name: 1, email: 1 });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({
    status: "Success",
    message: "User fetched successfully",
    data: user,
  });
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (!body.name) {
    throw new AppError("Name is required", 400);
  }

  if (!isValidObjectId(id)) {
    throw new AppError("Invalid user id", 400);
  }

  const user = await User.findByIdAndUpdate(
    id,
    { name: body.name },
    { new: true }
  );

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({
    status: "Success",
    message: "User updated successfully",
    data: user,
  });
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new AppError("Invalid user id", 400);
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(204).send();
};

export default {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};

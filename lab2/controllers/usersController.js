import { isValidObjectId } from "mongoose";
import User from "../models/usersModel.js";

const createUser = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({
        status: "failure",
        message: "there is some missing data",
      });
    }

    const user = await User.create(req.body);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: err.message || "Internal server error",
    });
  }
};

const getAllUsers = async (_, res) => {
  const users = await User.find({}, { name: 1, email: 1 });

  res.status(200).json({
    status: "success",
    message: "Users fetched successfully",
    data: users,
  });
};

const getUserById = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      status: "failure",
      message: "Invalid user id",
    });
  }

  const user = await User.findOne(
    { _id: req.params.id },
    { name: 1, email: 1 }
  );

  if (!user) {
    return res.status(404).json({
      status: "failure",
      message: "User not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "User fetched successfully",
    data: user,
  });
};

const updateUserById = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      status: "failure",
      message: "Name is required",
    });
  }

  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      status: "failure",
      message: "Invalid user id",
    });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({
      status: "failure",
      message: "User not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "User updated successfully",
    data: user,
  });
};

const deleteUserById = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      status: "failure",
      message: "Invalid user id",
    });
  }

  const user = await User.findOneAndDelete({ _id: req.params.id });

  if (!user) {
    return res.status(404).json({
      status: "failure",
      message: "User not found",
    });
  }

  res.status(204).send();
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};

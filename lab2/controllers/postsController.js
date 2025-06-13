import { isValidObjectId } from "mongoose";
import Post from "../models/postsModel.js";

const createPost = async (req, res) => {
  try {
    if (!req.body.title || !req.body.authorId) {
      return res.status(400).json({
        status: "failed",
        message: "there is some missing data",
      });
    }

    const post = await Post.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Post created successfully",
      data: post,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message || "Internal server error",
    });
  }
};

const getAllPosts = async (_, res) => {
  const posts = await Post.find({}, { title: 1 });

  res.status(200).json({
    status: "success",
    message: "Posts fetched successfully",
    data: posts,
  });
};

const getPostById = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      status: "failure",
      message: "Invalid post id",
    });
  }

  const post = await Post.findOne({ _id: req.params.id }, { title: 1 });

  if (!post) {
    return res.status(404).json({
      status: "failure",
      message: "Post not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Post fetched successfully",
    data: post,
  });
};

const updatePostById = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({
      status: "failure",
      message: "Title is required",
    });
  }

  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      status: "failure",
      message: "Invalid post id",
    });
  }

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true }
  );

  if (!post) {
    return res.status(404).json({
      status: "failure",
      message: "Post not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Post updated successfully",
    data: post,
  });
};

const deletePostById = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      status: "failure",
      message: "Invalid post id",
    });
  }

  const post = await Post.findOneAndDelete({ _id: req.params.id });

  if (!post) {
    return res.status(404).json({
      status: "failure",
      message: "Post not found",
    });
  }

  res.status(204).send();
};

export default {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};

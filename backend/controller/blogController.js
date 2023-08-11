const Blog = require("../model/blogModel");
const mongoose = require("mongoose");

const createBlog = async (req, res) => {
  const { title, author, content, image, category, tags } = req.body;

  const blog = new Blog({
    title,
    author,
    content,
    image,
    category,
    tags,
    user_id: req.user.id,
  });
  try {
    const newBlog = await Blog.create(blog);
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Blog creation failed",
      error: error.message,
    });
  }
};
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Blogs not found",
      error: error.message,
    });
  }
};
const getBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
      error: "Invalid Id",
    });
  }
  try {
    const blog = await Blog.findById(id);
    const isViewed = blog.views.find((view) => view === req.user.id);
    if (!isViewed) {
      blog.views.push(req.user.id);
      blog.save();
    }
    res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Blog not found",
      error: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
      error: "Invalid Id",
    });
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        _id: id,
        ...req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Blog not found",
      error: error.message,
    });
  }
};
const likeBlog = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
      error: "Invalid Id",
    });
  }
  try {
    const blog = await Blog.findById(id);
    let alreadyLiked = false;
    if (blog.likes.length > 0) {
      alreadyLiked = blog.likes.find((like) => like === req.user.id);
    }
    if (alreadyLiked) {
      blog.likes = blog.likes.filter((like) => like !== req.user.id);
      blog.save();
      res.status(200).json({
        success: true,
        message: "Blog unliked successfully",
        data: blog,
      });
    } else {
      blog.likes.push(req.user.id);
      blog.save();
      res.status(200).json({
        success: true,
        message: "Blog liked successfully",
        data: blog,
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Blog not found",
      error: error.message,
    });
  }
};
const commentBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
      error: "Invalid Id",
    });
  }
  try {
    const blog = await Blog.findById(id);
    blog.comments.push({
      userId: req.user.id,
      username: req.user.username,
      comment: req.body.comment,
    });

    blog.save();
    res.status(200).json({
      success: true,
      message: "Blog commented successfully",
      data: blog,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Blog not found",
      error: error.message,
    });
  }
};
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
      error: "Invalid Id",
    });
  }
  try {
    const deletedBlog = await Blog.findByIdAndRemove(id);
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      data: deletedBlog,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Blog not found",
      error: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  commentBlog,
};

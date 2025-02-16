const Blog = require("../models/blog");

exports.getBlog = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.createBlog = async (req, res, next) => {
  const { author, content, title } = req.body;
  console.log(author, content, title);
  if (!author || !content || !title) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newBlog = await new Blog({ author, content, title });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Blog.findByIdAndDelete(id);
    res.status(204).json({ message: "Blog deleted successfully" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.updateLikes = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.likes++;
    await blog.save();
    res.status(200).json(blog);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.updateComments = async (req, res, next) => {
  const { id } = req.params;
  const { username, content } = req.body;
  
  if (!username || !content) {
    return res.status(400).json({ message: "Username and content are required" });
  }

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.comments.push({ username, content });
    await blog.save();
    res.status(200).json(blog);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
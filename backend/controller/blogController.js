import Blog from "../models/blogModel.js";
import fs from "fs";
export const displayAllBlogs = async (req, res) => {
  try {
    let {
      search,
      limit,
      page
    } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;
    let searchCriteria = {};
    if (search) {
      searchCriteria = {
        title: {
          $regex: search,
          $options: "i"
        }
      };
    } else {
      searchCriteria = {};
    }
    const totalBlogs = await Blog.countDocuments(searchCriteria);
    const blogs = await Blog.find(searchCriteria).limit(limit).skip(skip).sort({
      updatedAt: -1
    });
    const totalPages = Math.ceil(totalBlogs / limit);
    res.status(200).json({
      success: true,
      blogs: blogs,
      totalBlogs,
      totalPages,
      currentPage: page,
      message: "Blogs retrieved successfully of home screen"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving blogs",
      error: error.message,
      success: false
    });
  }
};
export const displayUserBlogs = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized access, user not found",
        success: false
      });
    }
    const blogs = await Blog.find({
      "author.id": req.userId
    }).sort({
      createdAt: -1
    });
    res.status(200).json({
      success: true,
      blogs
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving blogs",
      error: error.message
    });
  }
};
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      description
    } = req.body;
    const image_file = `${req.file.filename}`;
    const newBlog = await Blog.create({
      title,
      description,
      image: image_file,
      author: {
        id: req.userId,
        name: req.name,
        image: req.image // Assuming req.image contains the author's image URL
      }
    });
    res.status(201).json({
      message: "Blog created successfully",
      newBlog
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating blog",
      error: error.message
    });
  }
};
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false
      });
    }
    if (blog.author.id.toString() !== req.userId.toString()) {
      return res.status(401).json({
        message: "not authorized to delte",
        success: false
      });
    }
    if (blog.image) {
      const imagePath = `uploads/${blog.image}`;
      if (fs.existsSync(imagePath)) {
        try {
          fs.unlinkSync(imagePath);
        } catch (error) {}
      }
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Blog deleted successfully",
      success: true
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting blog",
      error: error.message
    });
  }
};
export const findBlogById = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false
      });
    }
    res.status(200).json({
      success: true,
      blog
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving blog",
      error: error.message
    });
  }
};
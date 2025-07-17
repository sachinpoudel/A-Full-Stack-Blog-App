import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <>
      <div className="w-full max-w-5xl p-5 mt-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Link to={`/blog/${blog._id}`}>
            <div className="h-48 overflow-hidden">
              <img
                src={
                  blog.image
                    ? `http://localhost:3000/images/${blog.image}`
                    : "https://via.placeholder.com/400x200?text=No+Image"
                }
                alt={blog.title || "Blog image"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/400x200?text=Image+Not+Found";
                }}
              />
            </div>
          </Link>
          <div className="p-4">
            <h4 className="w-full font-bold">{blog.title}</h4>
            <p className="mt-2 line-clamp-2">{blog.description}</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-100">
            <p className="font-medium">
              {blog.author?.name || "Unknown Author"}
            </p>
            <p className="text-sm text-gray-500">
              {blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString()
                : "Unknown date"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;

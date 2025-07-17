import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { findBlogId } from "../api";

const Blogs = () => {
  const { allBlogs } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const foundBlog = allBlogs.find((blog) => blog._id === id);

        if (foundBlog) {
          console.log("Blog found in allBlogs:", foundBlog);
          setBlog(foundBlog);
          setLoading(false);
          return;
        }

        const response = await findBlogId(id);
        console.log("Blog fetched from API:", response.data);

        if (response.data && response.data.blog) {
          setBlog(response.data.blog);
        } else {
          setError("Blog not found");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, allBlogs]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="w-full max-w-[90%] mx-auto py-8 px-4">
        <div className="bg-red-50 p-4 rounded-md text-red-800 mb-4">
          {error || "Blog not found"}
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Go back to home
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[90%] mx-auto py-8 px-4">
      <div className="w-full">
        <img
          src={
            blog.image
              ? `http://localhost:3000/images/${blog.image}`
              : "https://via.placeholder.com/400x200?text=No+Image"
          }
          alt={blog.title || "Blog image"}
          className="object-cover h-90 w-full"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/400x200?text=Image+Not+Found";
          }}
        />
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <p className="mt-2 text-gray-700 leading-relaxed">
            {blog.description}
          </p>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-100">
          <p className="font-medium">{blog.author?.name || "Unknown Author"}</p>
          <p className="text-sm text-gray-500">
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString()
              : "Unknown date"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blogs;

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { getUserBlogs, deleteBlog, createBlog } from "../api";

const Dashboard = () => {
  const { user, loading, blogs, setBlogs } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("myBlogs");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [newBlog, setNewBlog] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [blogs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("description", newBlog.description);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const response = await createBlog(formData);
      console.log("Create blog response:", response.data);

      const createdBlog = response.data.newBlog;

      // Update the blogs array with the new blog
      setBlogs((prev) => [createdBlog, ...prev]);
      setShowCreateForm(false);
      setNewBlog({ title: "", description: "" });
      setSelectedFile(null);
      setActiveTab("myBlogs");
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog. Please try again.");
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      if (window.confirm("Are you sure you want to delete this blog?")) {
        await deleteBlog(blogId);
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Failed to delete blog. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-lg text-gray-600">
          Welcome back, {user?.name || "user"}!
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("myBlogs")}
            className={`${
              activeTab === "myBlogs"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            My Blogs
          </button>
          <button
            onClick={() => {
              setActiveTab("createBlog");
              setShowCreateForm(true);
            }}
            className={`${
              activeTab === "createBlog"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Create New Blog
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`${
              activeTab === "profile"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Profile Settings
          </button>
        </nav>
      </div>

      {/* My Blogs */}
      {activeTab === "myBlogs" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">My Blogs</h2>
            <button
              onClick={() => {
                setActiveTab("createBlog");
                setShowCreateForm(true);
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Create New Blog
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center my-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-md text-red-800">{error}</div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-500 mb-2">
                No blogs yet
              </h3>
              <button
                onClick={() => {
                  setActiveTab("createBlog");
                  setShowCreateForm(true);
                }}
                className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
              >
                Create New Blog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={`https://a-full-stack-blog-app.onrender.com/images/${blog.image}`}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">
                        {new Date(blog.publishedDate).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-indigo-600">
                        {blog.author?.name || "Unknown Author"}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 mb-4">
                      {blog.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <Link
                        to={`/blog/${blog._id}`}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Read More
                      </Link>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/edit-blog/${blog._id}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create Blog Form */}
      {activeTab === "createBlog" && showCreateForm && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Create New Blog
          </h2>
          <form onSubmit={handleCreateBlog}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={newBlog.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Choose Image
              </label>
              <input
                onChange={handleFileChange}
                type="file"
                accept="image/*"
                className="w-full border rounded-md p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={newBlog.description}
                onChange={handleInputChange}
                rows="3"
                required
                className="w-full px-3 py-2 border rounded-md"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setActiveTab("myBlogs");
                }}
                className="border px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md"
              >
                Create Blog
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Profile Settings
          </h2>
          <div className="flex items-center mb-6">
            <img
              src={
                user.avatar || "https://randomuser.me/api/portraits/men/1.jpg"
              }
              alt={user.name}
              className="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <h3 className="text-xl font-medium">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Update Profile</h3>
            <p className="text-gray-500 italic">Coming soon...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

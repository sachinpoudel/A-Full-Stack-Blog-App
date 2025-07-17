import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import BlogCard from "./BlogCard";
import { getAllBlogs } from "../api";

const BlogGrid = () => {
  const { allBlogs, setAllBlogs, allBlogsLoading, setAllBlogsLoading } =
    useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(6); // Show 6 blogs per page
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setAllBlogsLoading(true);
        const response = await getAllBlogs(search, currentPage, limit);

        if (response.data && response.data.blogs) {
          setAllBlogs(response.data.blogs);
          setTotalPages(response.data.totalPages);
        } else {
          setAllBlogs([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setAllBlogs([]);
      } finally {
        setAllBlogsLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, limit, search, setAllBlogs, setAllBlogsLoading]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="w-full my-8 max-w-7xl mx-auto px-4">
      {/* Blog heading section */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Explore Our Blogs</h2>
        <div className="flex items-center justify-center">
          <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          <div className="h-1 w-10 mx-2 bg-indigo-300 rounded"></div>
          <div className="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Discover the latest insights, tutorials, and stories from our
          community of writers.
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-8">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-2"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs..."
            className="px-4 py-2 border border-gray-300 rounded-md flex-grow"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Blogs display */}
      {allBlogsLoading ? (
        <div className="flex justify-center my-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : allBlogs.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-500 mb-2">
            No blogs available
          </h3>
          <p className="text-gray-400">Check back later for new content</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}

      {/* Pagination controls */}
      {!allBlogsLoading && allBlogs.length > 0 && (
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 flex items-center justify-center rounded-md ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-indigo-50 border border-gray-300"
              }`}
            >
              ⟨⟨
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 flex items-center justify-center rounded-md ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-indigo-50 border border-gray-300"
              }`}
            >
              ⟨
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;

                // Show only a window of page numbers
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-10 h-10 flex items-center justify-center rounded-md ${
                        currentPage === pageNumber
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-gray-700 hover:bg-indigo-50 border border-gray-300"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }

                // Show ellipsis for page gaps
                if (
                  (pageNumber === currentPage - 2 && pageNumber > 1) ||
                  (pageNumber === currentPage + 2 && pageNumber < totalPages)
                ) {
                  return (
                    <span key={pageNumber} className="px-1">
                      ...
                    </span>
                  );
                }

                return null;
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 flex items-center justify-center rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-indigo-50 border border-gray-300"
              }`}
            >
              ⟩
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 flex items-center justify-center rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-indigo-50 border border-gray-300"
              }`}
            >
              ⟩⟩
            </button>
          </div>
        </div>
      )}

      {/* Results per page selector */}
      {!allBlogsLoading && allBlogs.length > 0 && (
        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Items per page:</span>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setCurrentPage(1); // Reset to first page when changing limit
              }}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
              <option value={3}>3</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogGrid;

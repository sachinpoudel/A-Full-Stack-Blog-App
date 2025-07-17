import React, { useEffect, useState, createContext, useContext } from "react";
import { checkAuth, logoutFunc, getUserBlogs, getAllBlogs } from "../api";
import axios from "axios";

const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [allBlogs, setAllBlogs] = useState([]);
  const [allBlogsLoading, setAllBlogsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        setLoading(true);
        console.log("Checking authentication...");
        const response = await checkAuth();
        console.log("this", response.data);
        if (response.data && response.data.user) {
          console.log("User data found:", response.data.user);
          setUser(response.data.user || null); // Check if user data exists
        } else {
          console.log("No user data in response");
          setUser(null);
        } // Extract the user data
      } catch (error) {
        console.error("Error during authentication verification:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    verifyAuth();
  }, []);

  //Fetch blogs
  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        setBlogsLoading(true);

        const response = await getUserBlogs();
        console.log("API Response:", response);
        console.log("Response data:", response.data);
        if (response.data && response.data.blogs) {
          console.log(
            "Blogs fetched successfully of user:",
            response.data.blogs,
          );
        } else {
          console.log("No blogs found in response");
        }
        // Set blogs state with the fetched data
        setBlogs(response.data.blogs || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setBlogs([]);
      } finally {
        setBlogsLoading(false);
      }
    };
    fetchUserBlogs();
  }, [user, loading]);

  useEffect(() => {
    const fetchAllBlogs = async (search = "", page = 1, limit = 10) => {
      try {
        setAllBlogsLoading(true);
        console.log("Fetching all blogs...");
        const response = await getAllBlogs(search, page, limit);
        console.log("API Response for all blogs:", response);
        console.log("Response data for all blogs:", response.data);
        if (response.data && response.data.blogs) {
          console.log(
            "Blogs fetched successfully for all user :",
            response.data.blogs,
          );
          setAllBlogs(response.data.blogs || []);
        } else {
          console.log("No blogs found in response");
          setAllBlogs([]);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setAllBlogs([]);
      } finally {
        setAllBlogsLoading(false);
      }
    };
    fetchAllBlogs();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };
  const logout = async () => {
    try {
      const response = await logoutFunc();
      console.log("Logout successful:", response);
      console.log("Logout response:", response.data);
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        blogs,
        allBlogs,
        setAllBlogs,
        allBlogsLoading,
        setAllBlogsLoading,
        blogsLoading,
        setBlogs,
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

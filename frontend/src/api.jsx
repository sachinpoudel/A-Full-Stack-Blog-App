import axios from "axios";
axios.defaults.withCredentials = true;
const BASE_URL = "http://localhost:3000";

export const signUpFunc = async (formData) => {
  const url = `${BASE_URL}/api/auth/signup`;

  try {
    const response = await axios.post(
      url,
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("Signup response:", response.data);
    return response;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};
export const loginFunc = async (formData) => {
  const url = `${BASE_URL}/api/auth/login`;

  try {
    const response = await axios.post(
      url,
      {
        email: formData.email,
        password: formData.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const verifyEmailCode = async (joinedCode) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/verify-email`, {
      code: joinedCode,
    });
    return response;
  } catch (error) {
    console.error("Error during email verification:", error);
    throw error;
  }
};

export const reverifyEmailCode = async (joinedCode) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/re-verify-email`, {
      code: joinedCode,
    });
    return response;
  } catch (error) {
    console.error("Error during email verification:", error);
    throw error;
  }
};

export const resetLink = async (emailval) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/forgot-password`, {
      email: emailval,
    });
    return response;
  } catch (error) {
    console.error("Error during email verification:", error);
    throw error;
  }
};

export const resetPass = async (token, password) => {
  const url = `${BASE_URL}/api/auth/reset-password/${token}`;
  try {
    const response = await axios.post(
      url,
      {
        password,
      },
      {
        withCredentials: true,
        "Content-Type": "application/json",
      },
    );
    return response;
  } catch (error) {
    console.error("Error during password reset:", error);
    throw error;
  }
};

export const checkAuth = async () => {
  const url = `${BASE_URL}/api/auth/check-auth`;
  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });
    console.log("Authentication check response:", response.data);
    return response;
  } catch (error) {
    console.error("Error during authentication check:", error);
    throw error;
  }
};

export const logoutFunc = async () => {
  const url = `${BASE_URL}/api/auth/logout`;
  try {
    const response = await axios.post(url, {}, { withCredentials: true });
    console.log("Logout response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
export const getUserBlogs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/blog/userblogs`, {
      withCredentials: true,
    });
    console.log("User blogs fetched successfully:", response.data);
    if (!response.data || !response.data.blogs) {
      throw new Error("No blogs found in response");
    }
    return response;
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    throw error;
  }
};

export const getAllBlogs = async (search = "", page = 1, limit = 10) => {
  const url = `${BASE_URL}/api/blog/allblogs?search=${search}&page=${page}&limit=${limit}`;
  try {
    const response = await axios.get(url, { withCredentials: true });
    console.log(" blogs fetched successfully for all user:", response.data);
    if (!response.data || !response.data.blogs) {
      throw new Error("No blogs found in response");
    }
    return response;
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    throw error;
  }
};
export const createBlog = async (blogData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/blog/create`, blogData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

export const deleteBlog = async (blogId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/blog/delete/${blogId}`,
      { withCredentials: true },
    );
    return response;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

export const findBlogId = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/blog/${id}`, {
      withCredentials: true,
    });
    if (!response.data || !response.data.blog) {
      throw new Error("No blog found with the given ID");
    }
    return response;
  } catch (error) {
    console.error("Error finding blog ID:", error);
    throw error;
  }
};

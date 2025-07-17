import React, { useState } from "react";
import { resetLink } from "../api";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [emailval, setEmailval] = useState({ email: "" });
  const [loading, setloading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const response = await resetLink(emailval.email);
      console.log(response.data);
      setMessage(response.data.message || "Reset link sent successfully");
    } catch (error) {
      console.error("Error sending reset link:", error);
      setMessage(
        error.response?.data?.message ||
          "Failed to send reset link. Please try again.",
      );
    } finally {
      setloading(false);
    }
  };

  const handleChange = (e) => {
    setEmailval((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-10 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {message && (
          <div
            className={`rounded-xl text-center mb-3 p-3 ${message.includes("successful") ? "bg-green-200 text-green-800" : " text-red-800 bg-red-200"}`}
          >
            {message}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
          value={emailval.email}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded hover:cursor-pointer hover:bg-blue-700 transition ${loading ? "opacity-55 cursor-not-allowed" : ""}`}
        >
          {loading ? "Sending plz wait" : "Sent Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;

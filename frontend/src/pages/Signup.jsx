import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpFunc } from "../api";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { login } = useAuth();

  const [message, setMessage] = useState("");
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const response = await signUpFunc(formData);
      console.log(response.data);

      if (response.data.success && response.data.user) {
        login(response.data.user);
        setMessage("Signup successful! Redirecting to verification page...");
        setTimeout(() => {
          navigate("/verifycode");
        }, 2000); // Redirect after 2 seconds
      }
    } catch (err) {
      console.log(err);
      setMessage(
        err.response.data.message || "Signup failed. Please try again.",
      );
    } finally {
      setloading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <div className="flex  items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-10 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {message && (
          <div
            className={`rounded-xl text-center mb-3 p-3 ${message.includes("successful") ? "bg-green-200 text-green-800" : " text-red-800 bg-red-200"}`}
          >
            {message}
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-3 py-2 mb-6 border border-gray-300 rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className={` w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading ? "Creating your Acc" : "Sign up"}
        </button>
        <button
          onClick={() => handleGoogleSignup()}
          className="flex items-center justify-center gap-2 w-full mt-4 border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
        >
          Continue with Google
        </button>
        <p className="mt-3 text-center">
          Already signed up ?{" "}
          <Link to="/login" className="text-red-600">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

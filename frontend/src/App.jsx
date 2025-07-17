import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Verifycode from "./pages/Verifycode";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/Navbar";
import Blogs from "./pages/Blogs";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/blog/:id" element={<Blogs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verifycode" element={<Verifycode />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

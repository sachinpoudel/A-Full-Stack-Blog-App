import React from "react";
import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";
import BlogGrid from "../components/BlogGrid";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  return (
    <div>
      <Hero />
      <BlogGrid />
    </div>
  );
};

export default Home;

// src/components/PageLoader.jsx
import React, { useEffect } from "react";
import { ripples } from "ldrs"; // Ensure you have installed the ldrs library

const PageLoader = () => {
  useEffect(() => {
    ripples.register(); // Register the web component for ripple effect
  }, []);

  return (
    <div className="page-loader">
      <l-ripples size="45" speed="2" color="black"></l-ripples>
    </div>
  );
};

export default PageLoader;

// src/components/Loader.jsx
import React, { useEffect } from "react";
import { ripples } from "ldrs";

const Loader = () => {
  useEffect(() => {
    ripples.register(); // Register the web component
  }, []);

  return <l-ripples size="45" speed="2" color="black"></l-ripples>;
};

export default Loader;

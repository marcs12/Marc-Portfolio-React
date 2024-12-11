import React, { useState } from "react";
import { Link, animateScroll as scroll } from "react-scroll";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <Link to="hero" smooth={true} duration={500}>
        Hero
      </Link>
      <Link to="mission" smooth={true} duration={500}>
        Mission
      </Link>
      <Link to="projects" smooth={true} duration={500}>
        Projects
      </Link>
    </nav>
  );
};

export default NavBar;

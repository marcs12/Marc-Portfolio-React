import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const SlideTabsExample = () => {
  const [background, setBackground] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBackground("white");
      } else {
        setBackground("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.querySelector(".slide-tabs-container").style.transition =
      "background 0.3s ease";
  }, []);

  return (
    <div className="slide-tabs-container" style={{ background }}>
      <SlideTabs />
    </div>
  );
};

SlideTabsExample.propTypes = {
  children: PropTypes.node,
  setPosition: PropTypes.func,
};

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="slide-tabs"
    >
      <Tab setPosition={setPosition} to="/">
        Home
      </Tab>
      <Tab setPosition={setPosition} to="/works">
        Works
      </Tab>
      <Tab setPosition={setPosition} to="/about">
        About
      </Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition, to }) => {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash && location.pathname === "/") {
      const section = document.querySelector(location.hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="tab"
    >
      <Link to={to}>{children}</Link>
    </li>
  );
};

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  setPosition: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
};

const Cursor = ({ position }) => (
  <motion.li
    animate={{
      ...position,
    }}
    className="cursor"
  />
);

Cursor.propTypes = {
  position: PropTypes.shape({
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    opacity: PropTypes.number.isRequired,
  }).isRequired,
};

export default SlideTabsExample;

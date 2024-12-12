import { useRef, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const SlideTabsExample = () => {
  return (
    <div className="slide-tabs-container">
      <SlideTabs />
    </div>
  );
};

SlideTabsExample.propTypes = {
  children: PropTypes.node,
  setPosition: PropTypes.func,
};

// Move this block after the Tab component definition

export default SlideTabsExample;

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
      <Tab setPosition={setPosition}>Home</Tab>
      <Tab setPosition={setPosition}>Projects</Tab>
      <Tab setPosition={setPosition}>About</Tab>

      <Cursor position={position} />
    </ul>
  );
};

// Move this block after the Tab component definition

const Tab = ({ children, setPosition }) => {
  const ref = useRef(null);

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
      {children}
    </li>
  );
};

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  setPosition: PropTypes.func.isRequired,
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

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import logoMark from "../assets/adjust-logo.svg";

const LINKS = [
  { to: "/", label: "Index" },
  { to: "/works", label: "Works" },
  { to: "/about", label: "About" },
];

const NavBar = () => {
  const { pathname } = useLocation();
  const [hover, setHover] = useState({ left: 0, width: 0, opacity: 0 });

  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <motion.header
      className="site-nav"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
    >
      <Link to="/" className="nav-wordmark" aria-label="Marc Sapa, home">
        <span className="nav-mark">
          <img src={logoMark} alt="" aria-hidden="true" />
        </span>
        <span className="nav-name">Marc&nbsp;Sapa</span>
      </Link>

      <nav aria-label="Primary">
        <ul
          className="nav-tabs"
          onMouseLeave={() => setHover((p) => ({ ...p, opacity: 0 }))}
        >
          {LINKS.map((link) => (
            <NavTab
              key={link.to}
              to={link.to}
              active={isActive(link.to)}
              setHover={setHover}
            >
              {link.label}
            </NavTab>
          ))}
          <motion.li
            className="nav-cursor"
            animate={hover}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          />
        </ul>
      </nav>

      <a href="mailto:marcgsapa@gmail.com" className="nav-contact">
        <span className="nav-status-dot" aria-hidden="true" />
        Get in touch
      </a>
    </motion.header>
  );
};

const NavTab = ({ to, children, active, setHover }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className={`nav-tab${active ? " is-active" : ""}`}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setHover({ left: ref.current.offsetLeft, width, opacity: 1 });
      }}
    >
      <Link to={to}>{children}</Link>
    </li>
  );
};

NavTab.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
  setHover: PropTypes.func.isRequired,
};

export default NavBar;

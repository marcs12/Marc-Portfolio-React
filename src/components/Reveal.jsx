import { motion } from "framer-motion";
import PropTypes from "prop-types";

// Heavy fade-up used for scroll entry across the site. GPU-only (transform +
// opacity), fires once, honours reduced-motion via Framer's global config.
const Reveal = ({ children, delay = 0, y = 28, className, as = "div" }) => {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay }}
    >
      {children}
    </MotionTag>
  );
};

Reveal.propTypes = {
  children: PropTypes.node,
  delay: PropTypes.number,
  y: PropTypes.number,
  className: PropTypes.string,
  as: PropTypes.string,
};

export default Reveal;

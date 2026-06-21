import { Fragment } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// Word-by-word reveal for prominent headings. Each word slides up out of a
// clipped line on scroll-in, staggered. GPU-only (transform + opacity), fires
// once, honours reduced-motion via Framer's global MotionConfig.
const ease = [0.23, 1, 0.32, 1];

const container = {
  hidden: {},
  show: (delay = 0) => ({
    transition: { staggerChildren: 0.05, delayChildren: delay },
  }),
};

const word = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.7, ease } },
};

const SplitText = ({ text, as = "span", className, delay = 0 }) => {
  const Tag = motion[as] || motion.span;
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      variants={container}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
    >
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
            }}
          >
            <motion.span style={{ display: "inline-block" }} variants={word}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
};

SplitText.propTypes = {
  text: PropTypes.string.isRequired,
  as: PropTypes.string,
  className: PropTypes.string,
  delay: PropTypes.number,
};

export default SplitText;

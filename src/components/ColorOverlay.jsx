import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import EnvelopeIcon from "../assets/envelope-solid.svg";
import GithubIcon from "../assets/icons8-github.svg";
import LinkedInIcon from "../assets/icons8-linkedin.svg";

const ColorOverlay = () => {
  const controls = useAnimation();

  useEffect(() => {
    // Start the animation
    controls.start("visible");
  }, [controls]);

  const colorBoxVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const boxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("marcgsapa@gmail.com");
    alert("Email copied to clipboard!");
  };

  return (
    <article className="social-color">
      <motion.div
        className="color-boxes"
        initial="hidden"
        animate={controls}
        variants={colorBoxVariants}
      >
        <motion.div
          className="color-box color-box-one"
          variants={boxVariants}
        ></motion.div>
        <motion.div
          className="color-box color-box-two"
          variants={boxVariants}
        ></motion.div>
        <motion.div
          className="color-box color-box-three"
          variants={boxVariants}
        ></motion.div>
        <motion.div
          className="color-box color-box-four"
          variants={boxVariants}
        ></motion.div>
        <motion.div
          className="color-box color-box-five"
          variants={boxVariants}
        ></motion.div>
      </motion.div>
    </article>
  );
};

export default ColorOverlay;

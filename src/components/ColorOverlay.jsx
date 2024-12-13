import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import gsap from "gsap";
import SocialLinks from "./SocialLinks";

const ColorOverlay = () => {
  const controls = useAnimation();

  // useEffect(() => {
  //   // Start the Framer Motion animation
  //   controls.start("visible");

  // GSAP animation using fromTo
  //   gsap.fromTo(
  //     ".color-box",
  //     { height: "0vh", opacity: 1 },
  //     {
  //       height: "98vh",
  //       opacity: 0.5,
  //       duration: 100,
  //       delay: 5,
  //     },
  //   );
  // }, [controls]);

  useEffect(() => {
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

  return (
    <>
      <SocialLinks />
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
    </>
  );
};

export default ColorOverlay;

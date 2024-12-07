import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ColorOverlay = () => {
  const controls = useAnimation();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("scrollStart");
    } else {
      controls.start("scrollStop");
    }
  }, [controls, inView]);

  const scrollVariants = {
    scrollStop: { y: -1770, opacity: 0 },
    scrollStart: {
      y: -1770,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  const colorBoxVariants = {
    hidden: { y: -1770, opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
        staggerChildren: 0.1,
        delayChildren: 1.5,
      },
    },
  };

  const boxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.1 },
    },
  };

  return (
    <>
      <motion.article
        ref={ref}
        className="color-boxes"
        initial="hidden"
        animate={controls}
        variants={colorBoxVariants} // Apply scrollVariants here
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
      </motion.article>
      <motion.article
        className="color-boxes"
        initial="hidden"
        animate="visible"
        variants={scrollVariants} // Apply scrollVariants here
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
      </motion.article>
    </>
  );
};

export default ColorOverlay;

import { useEffect } from "react";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ColorOverlay = () => {
  const controls = useAnimation();
  const { scrollY } = useViewportScroll();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      controls.start({
        y: latest * 1, // Adjust the multiplier to control the speed of the animation
        transition: { duration: 0.1 },
      });
    });

    return () => unsubscribe();
  }, [scrollY, controls]);

  const colorBoxVariants = {
    hidden: { y: 0, opacity: 1 },
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
    hidden: { opacity: 1, scale: 0.8 },
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
      </motion.article>
    </>
  );
};

export default ColorOverlay;

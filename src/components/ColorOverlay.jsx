import { useEffect } from "react";
import { motion, useAnimation, useScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ColorOverlay = () => {
  const controls = useAnimation();
  const { scrollY } = useScroll();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.01,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      // console.log("Scroll position:", latest);
      controls.set({ y: latest * 1 }); // Use set() for real-time updates
      if (latest >= 888 && latest <= 1000) {
        controls.start({ opacity: 0 });
      } else {
        controls.start({ opacity: 1 });
      }
    });

    return () => unsubscribe();
  }, [scrollY, controls]);

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

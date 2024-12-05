import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import Scene from "./Scene";
import { motion } from "framer-motion";

import axios from "axios";

const Hero = () => {
  const [dateTime, setDateTime] = useState("");

  const fetchDateTime = async () => {
    try {
      const response = await axios.get(
        "http://worldtimeapi.org/api/timezone/America/Vancouver",
      );
      const dateTimeString = response.data.datetime;
      const date = new Date(dateTimeString);

      const formattedDate = date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });

      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZoneName: "short",
      });

      setDateTime(`${formattedDate} ${formattedTime}`);
    } catch (error) {
      console.error("Error fetching date and time:", error);
    }
  };

  useEffect(() => {
    fetchDateTime();

    gsap.fromTo(
      ".hero-wrap",
      { width: 0, height: 0, opacity: 0 },
      {
        width: "auto",
        height: "auto",
        opacity: 1,
        duration: 0.5,
        delay: 1,
        ease: "power4.out",
      },
    );

    gsap.fromTo(
      ".time-location",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.1,
        repeat: 3,
        ease: "power1.inOut",
        delay: 2,
      },
    );
  }, []);

  const colorBoxVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.3,
        delayChildren: 1.5,
      },
    },
  };

  const boxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <>
      <section className="hero-section">
        <article className="hero-wrap">
          <p className="sub-text">Creative Developer</p>
          <h1 className="hero-title">
            MARC <br />
            <span aria-hidden="true">...</span>SAPA
          </h1>
          <p className="sub-text-two">UX/UI Designer</p>

          <div className="topleft-border"></div>
          <div className="bottomright-border"></div>
        </article>
        <Scene />
        <article className="time-location">
          <p>Based in Vancouver, BC.</p>
          <p>{dateTime}</p>
        </article>
        <motion.article
          className="color-boxes"
          initial="hidden"
          animate="visible"
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
      </section>
    </>
  );
};

export default Hero;

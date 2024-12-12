import { useEffect, useState } from "react";
import { gsap } from "gsap";
import Scene from "./Scene";
import { motion } from "framer-motion";
import MissionStatement from "./MissionStatement";
import ColorOverlay from "./ColorOverlay";

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

  return (
    <>
      <div className="hero-line">
        <hr className="home-line" />
      </div>
      <section className="hero-section">
        <MissionStatement />
        <article className="hero-wrap">
          <p className="sub-text">Projects</p>
          <h1 className="hero-title">
            MARC <br />
            <span aria-hidden="true">...</span>SAPA
          </h1>
          <p className="sub-text-two">About Me</p>

          <div className="topleft-border"></div>
          <div className="bottomright-border"></div>
        </article>
        <Scene />

        <article className="time-location">
          <p>Based in Vancouver, BC.</p>
          <p>{dateTime}</p>
        </article>
      </section>
      <ColorOverlay />
    </>
  );
};

export default Hero;

import React from "react";
import Barcode from "../assets/barcode-long.png";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import MarcPhoto from "../assets/IMG_1968.JPG";

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { height: "0", opacity: 0 },
      { height: "100%", opacity: 1, duration: 3 },
    );
  }, []);

  return (
    <section className="about-section" ref={sectionRef}>
      <article className="top-section">
        <img
          className="barcode-ornament"
          src={Barcode}
          alt=""
          aria-hidden="true"
        />
        <div className="vl"></div>
        <div className="photo-intro">
          <img className="marc-photo" src={MarcPhoto} alt="Marc Sapa" />
          <p className="introduction">
            Marc Sapa is a multidisciplinary creative with a focus on creating
            high-level work across a variety of digital mediums such as
            automotive visualization and design.
          </p>
        </div>
      </article>
    </section>
  );
};

export default About;

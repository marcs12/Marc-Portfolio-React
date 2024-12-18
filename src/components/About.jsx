import React from "react";
import Barcode from "../assets/barcode-long.png";

const About = () => {
  return (
    <section className="about-section">
      <article className="top-section">
        <img
          className="barcode-ornament"
          src={Barcode}
          alt=""
          aria-hidden="true"
        />
        <div className="vl"></div>
      </article>
    </section>
  );
};

export default About;

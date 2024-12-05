import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const MissionStatement = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;

    gsap.fromTo(
      text,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 2,
        text: {
          value: text.innerHTML,
          delimiter: "",
        },
        ease: "power1.inOut",
      },
    );
  }, []);

  return (
    <section className="mission-statement">
      <p ref={textRef}>
        Crafting <strong>clean, responsive, and user-focused</strong> websites
        that bring ideas to life with
        <span className="creativity">creativity</span> and{" "}
        <span className="precision">precision</span>
      </p>
    </section>
  );
};

export default MissionStatement;

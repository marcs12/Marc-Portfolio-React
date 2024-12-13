import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const MissionStatement = () => {
  const pRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      pRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 2 },
    );
  }, []);

  return (
    <section className="mission-statement">
      <p ref={pRef}>
        Crafting <strong>clean, responsive, user-focused</strong> websites with
        <span className="creativity">creativity</span> and{" "}
        <span className="precision">precision</span>
      </p>
    </section>
  );
};

export default MissionStatement;

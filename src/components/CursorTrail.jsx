import React, { useEffect, useRef } from "react";

const CursorTrail = () => {
  const coords = useRef({ x: 0, y: 0 });
  const circlesRef = useRef([]);
  const colors = React.useMemo(
    () => [
      "#ffffff",
      "#f2f2f2",
      "#e6e6e6",
      "#d9d9d9",
      "#cccccc",
      "#bfbfbf",
      "#b3b3b3",
      "#a6a6a6",
      "#999999",
      "#8c8c8c",
      "#808080",
      "#737373",
      "#666666",
      "#595959",
      "#4d4d4d",
      "#404040",
      "#333333",
      "#262626",
      "#1a1a1a",
      "#0d0d0d",
    ],
    [],
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      coords.current.x = e.clientX;
      coords.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const initializeCircles = () => {
      circlesRef.current.forEach((circle, index) => {
        circle.x = 0;
        circle.y = 0;
        circle.style.backgroundColor = colors[index % colors.length];
      });
    };

    const animateCircles = () => {
      let x = coords.current.x;
      let y = coords.current.y;

      circlesRef.current.forEach((circle, index) => {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";
        circle.style.transform = `scale(${(circlesRef.current.length - index) / circlesRef.current.length})`;

        circle.x = x;
        circle.y = y;

        const nextCircle =
          circlesRef.current[index + 1] || circlesRef.current[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
      });

      requestAnimationFrame(animateCircles);
    };

    initializeCircles();
    animateCircles();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [colors]);

  return (
    <div>
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="circle"
          ref={(el) => (circlesRef.current[index] = el)}
        ></div>
      ))}
    </div>
  );
};

export default CursorTrail;

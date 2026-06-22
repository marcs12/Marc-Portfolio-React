import { useRef, isValidElement, cloneElement, Children } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Scroll-driven word-by-word reveal. Words start faint and brighten as the
// section scrolls through the viewport. Good for headings or large body copy.
//
// Accepts either a plain `text` string, or rich `children` (so inline
// <em>/<strong>/<span> styling is preserved — each word inside a wrapper keeps
// its element so existing CSS like `.statement-text em` still applies).
const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="reveal-word">
      <span className="reveal-word-shadow" aria-hidden="true">
        {children}
      </span>
      <motion.span className="reveal-word-fg" style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  );
};

// Flatten a ReactNode into an array of per-word tokens. Strings split on
// whitespace; elements keep their wrapper around each inner word.
const tokenize = (node) => {
  if (node == null || node === false) return [];
  if (typeof node === "string" || typeof node === "number") {
    return String(node)
      .split(/\s+/)
      .filter(Boolean);
  }
  if (Array.isArray(node)) return node.flatMap(tokenize);
  if (isValidElement(node)) {
    return tokenize(node.props.children).map((inner, i) =>
      cloneElement(node, { key: i }, inner),
    );
  }
  return [];
};

const TextRevealByWord = ({ text, children, as = "p", className = "" }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const tokens =
    children != null ? tokenize(Children.toArray(children)) : tokenize(text);
  const Tag = motion[as] || motion.p;

  return (
    <div ref={targetRef} className="text-reveal">
      <Tag className={`text-reveal-text ${className}`.trim()}>
        {tokens.map((token, i) => {
          const start = i / tokens.length;
          const end = start + 1 / tokens.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {token}
            </Word>
          );
        })}
      </Tag>
    </div>
  );
};

export default TextRevealByWord;

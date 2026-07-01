import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RevealLinks from "./TextEffect";

const EMAIL = "marcgsapa@gmail.com";
const YEAR = new Date().getFullYear();

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const footerRef = useRef(null);

  // The footer is fixed behind the page panel; the panel reserves scroll space
  // equal to the footer's height (--footer-h) so scrolling reveals it underneath.
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const set = () =>
      document.documentElement.style.setProperty(
        "--footer-h",
        `${el.offsetHeight}px`,
      );
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    window.addEventListener("resize", set);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", set);
      document.documentElement.style.removeProperty("--footer-h");
    };
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      toast("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <footer className="site-footer" id="contact" ref={footerRef}>
      <div className="footer-inner">
        <div className="footer-cue" aria-hidden="true">
          <span className="footer-cue-label">Marc Sapa</span>
          <span className="footer-cue-line" />
        </div>

        <p className="footer-eyebrow">Available for select projects in 2026</p>

        {/* Kinetic flip-link CTA (each word links out: GitHub / LinkedIn / email) */}
        <div className="footer-flip">
          <RevealLinks />
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <span className="footer-label">Get in touch</span>
            <button
              type="button"
              className="footer-link footer-email"
              onClick={copyEmail}
            >
              {copied ? "Copied" : EMAIL}
            </button>
            <span className="footer-meta">Vancouver, BC (PT)</span>
          </div>

          <div className="footer-col">
            <span className="footer-label">Elsewhere</span>
            <a
              className="footer-link"
              href="https://github.com/marcs12"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="footer-link"
              href="https://www.linkedin.com/in/marcsapa/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>

          <div className="footer-col">
            <span className="footer-label">Navigate</span>
            <Link className="footer-link" to="/works">
              Works
            </Link>
            <Link className="footer-link" to="/about">
              About
            </Link>
          </div>
        </div>

        <div className="footer-base">
          <span className="footer-wordmark">Marc Sapa</span>
          <span className="footer-meta">
            &copy; {YEAR}. Designed &amp; built in Vancouver.
          </span>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2200}
        hideProgressBar
        closeOnClick
        theme="dark"
      />
    </footer>
  );
};

export default Footer;

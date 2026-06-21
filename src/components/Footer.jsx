import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EMAIL = "marcgsapa@gmail.com";
const YEAR = new Date().getFullYear();

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      toast("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-inner">
        <p className="footer-eyebrow">Available for select projects in 2026</p>

        <a className="footer-cta" href={`mailto:${EMAIL}`}>
          <span className="footer-cta-line">Let&rsquo;s build</span>
          <span className="footer-cta-line footer-cta-line--accent">
            your next website
            <span className="footer-cta-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
                <path
                  d="M7 17 17 7M9 7h8v8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </a>

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

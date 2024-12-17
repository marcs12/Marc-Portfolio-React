import EnvelopeIcon from "../assets/envelope-solid.svg";
import GithubIcon from "../assets/icons8-github.svg";
import LinkedInIcon from "../assets/icons8-linkedin.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const SocialLinks = () => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText("marcgsapa@gmail.com").then(() => {
      toast("Email copied to clipboard! 📨 ");
    });
  };

  return (
    <>
      <motion.div
        className="social-svg"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
      >
        <a href="#" onClick={copyToClipboard}>
          <motion.img
            src={EnvelopeIcon}
            alt="Envelope Icon"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.8, rotate: -10 }}
            transition={{ duration: 0.3 }}
          />
        </a>
        <a
          href="https://github.com/marcs12"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.img
            src={GithubIcon}
            alt="Github Icon"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.8, rotate: -10 }}
            transition={{ duration: 0.3 }}
          />
        </a>
        <a
          href="https://linkedin.com/in/marcsapa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.img
            className="linked-in"
            src={LinkedInIcon}
            alt="LinkedIn Icon"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.8, rotate: -10 }}
            transition={{ duration: 0.3 }}
          />
        </a>
      </motion.div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default SocialLinks;

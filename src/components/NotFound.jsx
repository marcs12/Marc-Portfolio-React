import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <motion.div
        className="notfound-message"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <p className="eyebrow">Error 404</p>
        <h1>404</h1>
        <p>
          This page doesn&rsquo;t exist, or it moved. Let&rsquo;s get you back
          to the work.
        </p>
        <Link to="/" className="back-home-link">
          Back to home
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;

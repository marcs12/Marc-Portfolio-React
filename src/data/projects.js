import SnackLabVideo from "../assets/compressed/snacklab-desktop.mp4";
import ThirtyFiveVideo from "../assets/compressed/thirtyfive-desktop.mp4";
import RunYujiVideo from "../assets/compressed/runyuji-desktop.mp4";
import PortfolioVideo from "../assets/compressed/portfolio-desktop.mp4";

// Single source of truth for the work index + homepage teaser.
const projects = [
  {
    slug: "snacklab",
    index: "01",
    title: "SnackLab",
    summary:
      "A custom WooCommerce storefront for a fictional global-snack brand — bespoke theme, no page builder.",
    year: "2024",
    role: "Design & Development",
    discipline: "E-commerce",
    stack: ["Figma", "WordPress", "PHP", "Sass"],
    video: SnackLabVideo,
  },
  {
    slug: "thirtyfive",
    index: "02",
    title: "ThirtyFiveMM",
    summary:
      "A React film-discovery app on the TMDB API — search, favourites, and category browsing with a cinematic UI.",
    year: "2024",
    role: "Development",
    discipline: "Web App",
    stack: ["React", "TMDB API", "Sass"],
    video: ThirtyFiveVideo,
  },
  {
    slug: "runyuji",
    index: "03",
    title: "Run Yuji",
    summary:
      "An endless-runner built from scratch in vanilla JavaScript — physics, collision, and score, no engine.",
    year: "2024",
    role: "Design & Development",
    discipline: "Game",
    stack: ["JavaScript", "HTML", "CSS"],
    video: RunYujiVideo,
  },
  {
    slug: "portfolio",
    index: "04",
    title: "Portfolio",
    summary:
      "This site — a 3D glass logo with custom shaders, scroll-driven motion, and a hand-built design system.",
    year: "2024",
    role: "Design & Development",
    discipline: "Brand & Site",
    stack: ["React", "Three.js", "GSAP", "Sass"],
    video: PortfolioVideo,
  },
];

export default projects;

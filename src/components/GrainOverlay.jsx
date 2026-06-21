// Fixed, non-interactive film-grain overlay. Breaks the digital flatness of
// the near-black surfaces. Kept on its own fixed layer so it never triggers
// repaints on scrolling content (see high-end-visual-design perf guardrails).
const GrainOverlay = () => <div className="grain-overlay" aria-hidden="true" />;

export default GrainOverlay;

/**
 * Illustrations - Decorative SVG elements for sections
 * Variants: hero-orb, about-dots, section-line, floating-shapes, etc.
 */
import "./Illustrations.css";

export function HeroOrbs() {
  return (
    <div className="illus-hero-orbs" aria-hidden="true">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
    </div>
  );
}

export function AboutDecoration() {
  return (
    <div className="illus-about" aria-hidden="true">
      <svg className="illus-about-ring" viewBox="0 0 320 320">
        <circle cx="160" cy="160" r="140" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <circle cx="160" cy="160" r="120" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      </svg>
      <div className="illus-about-dots">
        {[...Array(8)].map((_, i) => (
          <span key={i} className="dot" style={{ "--i": i }} />
        ))}
      </div>
    </div>
  );
}

export function SectionDivider({ variant = "line" }) {
  return (
    <div className={`illus-divider illus-divider-${variant}`} aria-hidden="true">
      <span className="line" />
      <span className="accent" />
      <span className="line" />
    </div>
  );
}

export function FloatingShapes() {
  return (
    <div className="illus-floating" aria-hidden="true">
      <div className="shape shape-1" />
      <div className="shape shape-2" />
      <div className="shape shape-3" />
      <div className="shape shape-4" />
      <div className="shape shape-5" />
    </div>
  );
}

export function GridPattern() {
  return (
    <div className="illus-grid" aria-hidden="true">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(184,190,199,0.12)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

export function CornerAccent({ position = "top-left" }) {
  return (
    <div className={`illus-corner illus-corner-${position}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,0 L100,0 L100,100 L0,100 Z M0,0 L40,0 L0,40 Z" fill="rgba(184,190,199,0.12)" />
      </svg>
    </div>
  );
}

import { useState, useEffect, useCallback } from "react";
import "./Navbar.css";

const LEFT_LINKS = [
  { label: "Home",      href: "#home" },
  { label: "About",     href: "#about" },
  { label: "Skills",    href: "#skills" },
  { label: "Software", href: "#software" },
];

const RIGHT_LINKS = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog",    href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];

export default function Navbar({
  logo     = "AP",
  ctaLabel = "Hire Me",
  ctaHref  = "#contact",
}) {
  const [scrolled,       setScrolled] = useState(false);
  const [menuOpen,       setMenuOpen] = useState(false);
  const [activeSection,  setActive]   = useState("home");

  /* ── Smooth scroll helper ─────────────────────────────────────── */
  const scrollTo = useCallback((href, e) => {
    if (e) e.preventDefault();

    const id = href.replace("#", "");
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (href.startsWith("#")) {
      // fallback: jump to top for #home when no element exists
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setMenuOpen(false);
  }, []);

  /* ── Scroll-position effects (scrolled flag) ──────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active-section via IntersectionObserver ──────────────────── */
  useEffect(() => {
    const sectionIds = ALL_LINKS.map(({ href }) => href.replace("#", ""));

    const observers = [];

    // Map to track which sections are currently visible and their ratio
    const visibilityMap = {};

    const pickMostVisible = () => {
      let best = null;
      let bestRatio = 0;

      // Prefer the section closest to the top of viewport when multiple are visible
      sectionIds.forEach((id) => {
        const ratio = visibilityMap[id] ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      });

      if (best) setActive(best);
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          visibilityMap[id] = entry.intersectionRatio;
          pickMostVisible();
        },
        {
          // Fire at fine granularity so we notice small sections
          threshold: Array.from({ length: 21 }, (_, i) => i / 20),
          // Shrink the top of the viewport by navbar height (~80px) + buffer
          rootMargin: "-80px 0px -20% 0px",
        }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  /* ── Close mobile menu on outside click ──────────────────────── */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (!e.target.closest(".navbar")) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [menuOpen]);

  const isActive      = (href) => activeSection === href.replace("#", "");
  const opensInNewTab = (href) => href === "#blog";

  const linkProps = (href) => ({
    href,
    className: isActive(href) ? "active" : "",
    onClick: (e) => scrollTo(href, e),
    ...(opensInNewTab(href)
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {}),
  });

  return (
    <nav
      className={[
        "navbar",
        scrolled ? "scrolled" : "",
        menuOpen ? "open"     : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="navbar-inner">

        {/* LEFT */}
        <div className="navbar-left">
          {LEFT_LINKS.map(({ label, href }) => (
            <a key={href} {...linkProps(href)}>{label}</a>
          ))}
        </div>

        {/* CENTER LOGO */}
        <div className="navbar-logo">
          <a href="#home" onClick={(e) => scrollTo("#home", e)}>{logo}</a>
        </div>

        {/* RIGHT */}
        <div className="navbar-right">
          {RIGHT_LINKS.map(({ label, href }) => (
            <a key={href} {...linkProps(href)}>{label}</a>
          ))}
          <a
            href={ctaHref}
            className="navbar-cta-btn"
            onClick={(e) => scrollTo(ctaHref, e)}
          >
            {ctaLabel}
          </a>
        </div>

        {/* HAMBURGER */}
        <button
          className={`navbar-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>

      </div>

      {/* MOBILE DRAWER */}
      <div className="navbar-mobile-menu" aria-hidden={!menuOpen}>
        {ALL_LINKS.map(({ label, href }) => (
          <a key={href} {...linkProps(href)}>{label}</a>
        ))}
        <div className="navbar-mobile-cta">
          <a
            href={ctaHref}
            className="navbar-cta-btn"
            onClick={(e) => scrollTo(ctaHref, e)}
          >
            {ctaLabel}
          </a>
        </div>
      </div>

    </nav>
  );
}
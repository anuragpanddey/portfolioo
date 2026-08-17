/**
 * About Me Section
 * - Two-column layout (profile image + stats left, content right)
 * - Stats rendered below the profile image in the left column
 * - Decorative ring/dots animation around profile pic
 * - Scroll-triggered animations
 * - Background: p14.jpeg (center/cover, no-repeat)
 */
import { aboutData } from "../data";
import AnimatedSection from "./AnimatedSection";
import { AboutDecoration } from "./Illustrations";
import "./About.css";

export default function About() {
  const { image, heading, text, stats } = aboutData;

  return (
    <section id="about" className="about">
      <AnimatedSection variant="fadeUp" stagger>
        <div className="about-container">

          {/* ── Left column: profile photo + stats below ── */}
          <div className="about-left">
            <div className="about-image-wrap">
              <div className="about-image-anim">
                <img src={image} alt={heading} className="about-image" />
                <AboutDecoration />
              </div>
            </div>

            {/* Stats placed directly below the profile image */}
            <div className="about-stats">
              {stats.map((stat) => (
                <div key={stat.label} className="about-stat">
                  <span className="about-stat-value">{stat.value}</span>
                  <span className="about-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column: heading + bio text ── */}
          <div className="about-right">
            <h2 className="about-heading">{heading}</h2>
            <p className="about-text">{text}</p>
            {/* CTA button – uncomment to enable */}
            {/* <a href={ctaButton.href} className="about-cta">
              {ctaButton.label}
            </a> */}
          </div>

        </div>
      </AnimatedSection>
    </section>
  );
}
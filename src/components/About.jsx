/**
 * About Me Section
 * - Two-column layout (profile image + stats left, content right)
 * - Stats rendered below the profile image in the left column
 * - Education cards rendered underneath the bio text, right column
 * - Decorative ring/dots animation around profile pic
 * - Scroll-triggered animations
 * - Background: p14.jpeg (center/cover, no-repeat)
 */
import { aboutData, educationData } from "../data";
import { useAsset } from "../context/assetsContextStore";
import AnimatedSection from "./AnimatedSection";
import { AboutDecoration } from "./Illustrations";
import TextType from "./TextType";
import "./About.css";

const shortLabel = (school) => school.trim().split(" ")[0].toUpperCase();

export default function About() {
  const { heading, text, stats } = aboutData;
  const image = useAsset("about_image", aboutData.image);
  const bgImage = useAsset("about_bg", "");

  return (
    <section
      id="about"
      className="about"
      style={bgImage ? { "--about-bg-image": `url(${bgImage})` } : undefined}
    >
      <AnimatedSection variant="fadeUp" stagger>
        <div className="about-container">

          {/* ── Left column: profile photo + stats below ── */}
          <div className="about-left">
            <div className="about-image-wrap">
              <div className="about-image-anim">
                {image && (
                  <img
                    src={image}
                    alt={heading}
                    className="about-image"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                )}
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

          {/* ── Right column: heading + bio text + education ── */}
          <div className="about-right">
            <TextType as="h2" className="about-heading" text={heading} startOnVisible loop={false} />
            <p className="about-text">{text}</p>
            {/* CTA button – uncomment to enable */}
            {/* <a href={ctaButton.href} className="about-cta">
              {ctaButton.label}
            </a> */}

            <div className="about-education">
              <h3 className="about-education-heading">Education</h3>
              <div className="about-education-grid">
                {educationData.map((item) => (
                  <div key={item.school} className="edu-card">
                    <div className="edu-card-top">
                      <h4 className="edu-card-title">{shortLabel(item.school)}</h4>
                      <span className="edu-card-year">{item.year}</span>
                    </div>
                    <p className="edu-card-degree">{item.degree.trim()}</p>
                    <p className="edu-card-school">{item.school.trim()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </AnimatedSection>
    </section>
  );
}
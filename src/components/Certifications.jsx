/**
 * Certifications & Achievements Section
 * - Certifications: glassmorphism card grid with a badge icon
 * - Achievements: vertical timeline, each entry a glass card
 * Visual theme matches Contact/Footer (black / white / red-orange).
 */
import { certificationsData } from "../data";
import AnimatedSection from "./AnimatedSection";
import { GridPattern } from "./Illustrations";
import TextType from "./TextType";
import "./Certifications.css";

const ACHIEVEMENT_ISSUERS = [
  "Independent Film Project",
  "Self-Initiated Product",
  "Government Event (First Official)",
  "Government Events (Ongoing)",
  "Certificate Program",
];

function BadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="5.5" />
      <path d="M8.5 13 7 21l5-2.5L17 21l-1.5-8" />
    </svg>
  );
}

export default function Certifications() {
  const certifications = certificationsData.filter(
    (item) => !ACHIEVEMENT_ISSUERS.includes(item.issuer)
  );
  const achievements = certificationsData.filter((item) =>
    ACHIEVEMENT_ISSUERS.includes(item.issuer)
  );

  return (
    <section id="certifications" className="certifications">
      <GridPattern />

      <div className="cert-inner">
        <AnimatedSection variant="fadeUp">
          <span className="cert-eyebrow">
            <span className="cert-eyebrow-dot" />
            Milestones
          </span>
          <TextType
            as="h2"
            className="section-heading"
            text="Certifications & Achievements"
            startOnVisible
            loop={false}
          />
        </AnimatedSection>

        {/* ── Certifications: glass card grid ── */}
        <div className="cert-cards-grid">
          {certifications.map((item, i) => {
            const hasLink = item.url && item.url !== "#";
            const Tag = hasLink ? "a" : "div";
            return (
              <AnimatedSection key={item.title} variant="fadeUp" delay={i * 80}>
                <Tag
                  {...(hasLink ? { href: item.url, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`cert-card${hasLink ? " cert-card-link" : ""}`}
                >
                  <span className="cert-badge">
                    <BadgeIcon />
                  </span>
                  <span className="cert-year">{item.year}</span>
                  <h3 className="cert-title">{item.title}</h3>
                  <p className="cert-issuer">{item.issuer}</p>
                </Tag>
              </AnimatedSection>
            );
          })}
        </div>

        {/* ── Achievements: compact 2-column grid ── */}
        <div className="achieve-wrapper">
          <AnimatedSection variant="fadeUp">
            <h3 className="cert-col-heading">Achievements</h3>
          </AnimatedSection>
          <div className="achieve-grid">
            {achievements.map((item, i) => (
              <AnimatedSection key={item.title} variant="fadeUp" delay={i * 80}>
                <div className="achieve-card">
                  <span className="achieve-dot" />
                  <div className="achieve-top">
                    <span className="achieve-title">{item.title}</span>
                    <span className="achieve-year">{item.year}</span>
                  </div>
                  {item.issuer && <span className="achieve-tag">{item.issuer}</span>}
                  {item.description && (
                    <p className="achieve-description">{item.description}</p>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

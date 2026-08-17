/**
 * Certifications & Achievements Section
 * - Certifications: 3-col card grid (year, bold title, muted issuer)
 * - Achievements: list with title, year, one-line description (unchanged)
 */
import { certificationsData } from "../data";
import AnimatedSection from "./AnimatedSection";
import { SectionDivider } from "./Illustrations";
import "./Certifications.css";

const ACHIEVEMENT_ISSUERS = [
  "Independent Film Project",
  "Self-Initiated Product",
  "Government Event (First Official)",
  "Government Events (Ongoing)",
  "Certificate Program",
];

export default function Certifications() {
  const certifications = certificationsData.filter(
    (item) => !ACHIEVEMENT_ISSUERS.includes(item.issuer)
  );
  const achievements = certificationsData.filter((item) =>
    ACHIEVEMENT_ISSUERS.includes(item.issuer)
  );

  return (
    <section id="certifications" className="certifications">
      <AnimatedSection variant="fadeUp">
        <h2 className="section-heading">Certifications &amp; Achievements</h2>
        <SectionDivider />
      </AnimatedSection>

      {/* ── Certifications: card grid ── */}
      <div className="cert-cards-grid">
        {certifications.map((item, i) => (
          <AnimatedSection key={i} variant="fadeUp" delay={i * 80}>
            {item.url && item.url !== "#" ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-card cert-card-link"
              >
                <span className="cert-year">{item.year}</span>
                <h3 className="cert-title">{item.title}</h3>
                <p className="cert-issuer">{item.issuer}</p>
              </a>
            ) : (
              <div className="cert-card">
                <span className="cert-year">{item.year}</span>
                <h3 className="cert-title">{item.title}</h3>
                <p className="cert-issuer">{item.issuer}</p>
              </div>
            )}
          </AnimatedSection>
        ))}
      </div>

      {/* ── Achievements: list ── */}
      <div className="achieve-wrapper">
        <AnimatedSection variant="fadeUp">
          <h3 className="cert-col-heading">Achievements</h3>
        </AnimatedSection>
        <ul className="achieve-list">
          {achievements.map((item, i) => (
            <AnimatedSection key={i} variant="fadeUp" delay={i * 80}>
              <li className="achieve-list-item">
                <div className="achieve-body">
                  <div className="achieve-top">
                    <span className="achieve-title">{item.title}</span>
                    <span className="achieve-year">{item.year}</span>
                  </div>
                  {item.description && (
                    <p className="achieve-description">{item.description}</p>
                  )}
                </div>
              </li>
            </AnimatedSection>
          ))}
        </ul>
      </div>
    </section>
  );
}
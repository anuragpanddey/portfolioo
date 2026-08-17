/**
 * Education / Schooling Section
 * - Timeline with animated reveal
 */
import { educationData } from "../data";
import AnimatedSection from "./AnimatedSection";
import { FloatingShapes } from "./Illustrations";
import "./Education.css";

export default function Education() {
  return (
    <section id="education" className="education">
      <FloatingShapes />
      <AnimatedSection variant="fadeUp">
        <h2 className="section-heading">Education</h2>
      </AnimatedSection>
      <div className="education-timeline">
        {educationData.map((item, i) => (
          <AnimatedSection key={i} variant="slideLeft" delay={i * 120}>
            <div className="edu-item">
              <span className="edu-year">{item.year}</span>
              <h3 className="edu-degree">{item.degree}</h3>
              <p className="edu-school">{item.school}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

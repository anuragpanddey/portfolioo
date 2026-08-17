/**
 * Skills Section
 * - List of professional skills with staggered tag animation
 */
import { skillsData } from "../data";
import AnimatedSection from "./AnimatedSection";
import { GridPattern } from "./Illustrations";
import "./Skills.css";

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <GridPattern />
      <AnimatedSection variant="fadeUp">
        <h2 className="section-heading">My Skills</h2>
      </AnimatedSection>
      <div className="skills-grid">
        {skillsData.map((skill, i) => (
          <AnimatedSection key={skill} variant="fadeUp" delay={i * 50}>
            <div className="skill-tag">{skill}</div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

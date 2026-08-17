/**
 * Skills Section
 * - List of professional skills with staggered tag animation
 */
import { useState } from "react";
import { skillsData } from "../data";
import { useAsset } from "../context/assetsContextStore";
import AnimatedSection from "./AnimatedSection";
import { GridPattern } from "./Illustrations";
import "./Skills.css";

export default function Skills() {
  const [videoError, setVideoError] = useState(false);
  const backgroundVideo = useAsset("skills_video", "");

  return (
    <section id="skills" className="skills">
      {!videoError && backgroundVideo && (
        <div className="skills-bg">
          <video
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="skills-video"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <div className="skills-overlay" />
        </div>
      )}
      <GridPattern />
      <div className="skills-content">
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
      </div>
    </section>
  );
}

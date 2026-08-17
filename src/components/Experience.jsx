/**
 * Work Experience Section - Timeline style
 * - Animated timeline dots and items
 */
import { useState } from "react";
import { experienceData } from "../data";
import { useAsset } from "../context/assetsContextStore";
import AnimatedSection from "./AnimatedSection";
import { SectionDivider, CornerAccent } from "./Illustrations";
import "./Experience.css";

export default function Experience() {
  const [videoError, setVideoError] = useState(false);
  const backgroundVideo = useAsset("experience_video", "");

  return (
    <section id="experience" className="experience">
      {!videoError && backgroundVideo && (
        <div className="experience-bg">
          <video
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="experience-video"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <div className="experience-overlay" />
        </div>
      )}
      <CornerAccent position="bottom-left" />
      <div className="experience-content">
        <AnimatedSection variant="fadeUp">
          <h2 className="section-heading">Work Experience</h2>
          <SectionDivider />
        </AnimatedSection>
        <div className="experience-timeline">
          {experienceData.map((item, i) => (
            <AnimatedSection key={i} variant="fadeUp" delay={i * 100}>
              <div className="exp-item">
                <div className="exp-left">
                  <h3 className="exp-title">{item.title}</h3>
                  <span className="exp-period">{item.period}</span>
                  <span className="exp-company">{item.company}</span>
                </div>
                <div className="exp-dot exp-dot-animate"></div>
                <div className="exp-right">
                  <p>{item.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
import { softwareData } from "../data";
import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import "./Software.css";

export default function Software() {
  const [failedLogos, setFailedLogos] = useState({});

  return (
    <section id="software" className="software">
      <AnimatedSection variant="fadeUp">
        <h2 className="section-heading software-heading">SOFTWARE</h2>
      </AnimatedSection>
      <AnimatedSection variant="scale" delay={100}>
        <div className="software-grid">
          {softwareData.map((item) => {
            const iconLabel = item.shortCode || item.name.slice(0, 2);
            return (
              <article key={item.name} className="software-card">
                <div className="software-card-icon-box">
                  {item.logo && !failedLogos[item.name] ? (
                    <img
                      src={item.logo}
                      alt={`${item.name} logo`}
                      className="software-card-icon-image"
                      loading="lazy"
                      onError={() =>
                        setFailedLogos((prev) => ({ ...prev, [item.name]: true }))
                      }
                    />
                  ) : (
                    <span className="software-card-icon-fallback">{iconLabel}</span>
                  )}
                </div>
                <h3 className="software-card-title">{item.name}</h3>
                <div className="software-progress">
                  <span
                    className="software-progress-fill"
                    style={{ width: `${item.level}%` }}
                  />
                </div>
                <p className="software-card-level">{item.level}%</p>
              </article>
            );
          })}
        </div>
      </AnimatedSection>
    </section>
  );
}

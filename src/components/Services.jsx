/**
 * Services / Content Section
 * - Photography, videography, movie, rendering, ui templates, etc.
 * - Card grid with staggered animations
 */
import { servicesData } from "../data";
import AnimatedSection from "./AnimatedSection";
import { SectionDivider, CornerAccent } from "./Illustrations";
import "./Services.css";

export default function Services() {
  return (
    <section id="services" className="services">
      <CornerAccent position="top-right" />
      <AnimatedSection variant="fadeUp">
        <div className="services-header">
          <h2 className="section-heading">My Services</h2>
          <SectionDivider />
          <p className="services-desc">Creative solutions across photography, design, and digital media.</p>
        </div>
      </AnimatedSection>
      <div className="services-grid">
        {servicesData.map((service, i) => (
          <AnimatedSection key={service.id} variant="fadeUp" delay={i * 60}>
            <a
              className="service-card"
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${service.title} in new tab`}
            >
              <div className="service-image-wrap">
                <img src={service.image} alt={service.title} className="service-image" />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              <span className="service-arrow">→</span>
            </a>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

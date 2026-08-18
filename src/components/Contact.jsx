/**
 * Contact & Footer Section
 * - Contact: single dark CTA card (label + heading + waveform) with an
 *   orange "ask us anything" bar at the bottom — no form, mailto only.
 * - Footer: three columns (Explore / Connect / Social) matching the
 *   reference layout, built entirely from existing data (no invented
 *   content) — phone number dropped per instruction.
 */
import { contactData, footerLinks, siteConfig } from "../data";
import { FaLinkedin, FaInstagram, FaXTwitter, FaBehance, FaEnvelope, FaGithubAlt, FaArtstation, FaBloggerB } from "react-icons/fa6";
import AnimatedSection from "./AnimatedSection";
import { GridPattern } from "./Illustrations";
import TextType from "./TextType";
import "./Contact.css";

const socialIconMap = { FaLinkedin, FaInstagram, FaXTwitter, FaBehance, FaEnvelope, FaBloggerB, FaGithubAlt, FaArtstation };

// Opens Gmail's web compose UI (works for any visitor, regardless of their
// OS-level default mail client) pre-addressed to the contact email.
const gmailComposeUrl = (email) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

// Decorative waveform — generated once, dot count per bar approximates an
// audio equalizer. Purely presentational, so a fixed random seed is fine.
const WAVE_BAR_COUNT = 64;
const waveBars = Array.from({ length: WAVE_BAR_COUNT }, () => Math.floor(Math.random() * 15) + 2);

export default function Contact() {
  const contactLink = footerLinks.support.find((l) => l.label === "Contact");
  const otherSupportLinks = footerLinks.support.filter((l) => l.label !== "Contact");

  return (
    <section id="contact" className="contact">
      {/* CTA Card */}
      <AnimatedSection variant="fadeUp">
        <div className="contact-cta-card">
          <GridPattern />

          <div className="contact-cta-inner">
            <span className="contact-cta-label">
              <span className="contact-cta-dot" />
              {contactData.ctaLabel}
            </span>
            <TextType
              as="h2"
              className="contact-cta-heading"
              text={contactData.heading}
              startOnVisible
              loop={false}
            />

            <div className="contact-wave" aria-hidden="true">
              {waveBars.map((dots, i) => (
                <span key={i} className="contact-wave-bar">
                  {Array.from({ length: dots }).map((_, d) => (
                    <span key={d} className="contact-wave-dot" />
                  ))}
                </span>
              ))}
            </div>
          </div>

          <a
            href={gmailComposeUrl(contactData.email)}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-ask-bar"
          >
            <span className="contact-ask-text">{contactData.ctaBarLabel}</span>
            <span className="contact-ask-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
          </a>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">

          {/* Explore */}
          <div className="footer-col">
            <h4 className="footer-heading">Explore:</h4>
            {contactData.tagline && <p className="footer-tagline">{contactData.tagline}</p>}
            <ul className="footer-nav-list">
              {footerLinks.resources.map((link) => (
                <li key={link.label}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="footer-col">
            <h4 className="footer-heading">Connect:</h4>

            <p className="footer-label">Get in Touch:</p>
            {contactLink && (
              <a href={contactLink.href} className="footer-connect-btn">
                <span className="footer-connect-btn-text">{contactLink.label}</span>
                <span className="footer-connect-btn-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </a>
            )}

            <p className="footer-label footer-label--spaced">Direct Inquiries:</p>
            <a href={`mailto:${contactData.email}`} className="footer-email">{contactData.email}</a>
            {contactData.address && <p className="footer-address">{contactData.address}</p>}
          </div>

          {/* Social */}
          <div className="footer-col">
            <h4 className="footer-heading">Social:</h4>
            <ul className="footer-social-list">
              {contactData.social.map((s) => {
                const Icon = socialIconMap[s.icon];
                return (
                  <li key={s.name}>
                    <a href={s.url} target="_blank" rel="noreferrer">
                      <span className="footer-social-icon">{Icon && <Icon />}</span>
                      {s.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-links">
            {otherSupportLinks.map((link) => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </div>
          <p className="footer-copyright">© {new Date().getFullYear()} {siteConfig.logo.text}. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}

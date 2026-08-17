/**
 * Contact & Footer Section
 * - Two-column layout: video left, form right (separate cards)
 * - EmailJS initialized at module level to prevent auth errors
 * - Template variables match: from_name, from_email, from_phone, message
 */
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { contactData, footerLinks, siteConfig } from "../data";
import { FaLinkedin, FaInstagram, FaXTwitter, FaBehance, FaEnvelope, FaGithubAlt, FaArtstation, FaBloggerB } from "react-icons/fa6";
import AnimatedSection from "./AnimatedSection";
import { SectionDivider } from "./Illustrations";
import "./Contact.css";

// ── EmailJS config — must match your EmailJS dashboard exactly ──────────────
const EMAILJS_SERVICE_ID  = "service_5qexxkn";
const EMAILJS_TEMPLATE_ID = "template_bkqwumk";
const EMAILJS_PUBLIC_KEY  = "PAYUAEn4_36DqVZWi";

// ✅ Initialize EmailJS once at module level — fixes "Public Key invalid" errors
emailjs.init(EMAILJS_PUBLIC_KEY);
// ────────────────────────────────────────────────────────────────────────────

const socialIconMap = { FaLinkedin, FaInstagram, FaXTwitter, FaBehance, FaEnvelope, FaBloggerB, FaGithubAlt, FaArtstation };

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "success" | "error"

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return;
    setStatus("sending");

    // ✅ These keys MUST exactly match {{placeholders}} in your EmailJS template
    const templateParams = {
      from_name:  formData.fullName,  // → {{from_name}}
      from_email: formData.email,     // → {{from_email}}  (also used in Reply-To field)
      from_phone: formData.phone,     // → {{from_phone}}
      message:    formData.message,   // → {{message}}
    };

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setStatus("success");
        setFormData({ fullName: "", email: "", phone: "", message: "" });
      })
      .catch((err) => {
        // Open browser DevTools → Console to see the exact EmailJS error reason
        console.error("EmailJS send failed:", err?.text || err);
        setStatus("error");
      });
  };

  const buttonLabel =
    status === "sending" ? "Sending…" :
    status === "success" ? "Sent ✓"   :
    status === "error"   ? "Retry"    : "Submit";

  const isDisabled = status === "sending" || status === "success";

  return (
    <section id="contact" className="contact">
      {/* CTA Banner */}
      <div className="contact-cta">
        <AnimatedSection variant="fadeUp">
          <h2 className="contact-cta-heading">{contactData.heading}</h2>
          <SectionDivider />
        </AnimatedSection>

        {/* Outer wrapper — two separate panels side by side */}
        <AnimatedSection variant="fadeUp" delay={150}>
          <div className="contact-wrapper">

            {/* Left: Video card */}
            <div className="contact-video-card">
              {/* Video removed - assets folder no longer exists */}
              <div className="contact-video" />
              <div className="contact-video-overlay" />
            </div>

            {/* Right: Form card */}
            <div className="contact-form-panel">
              <form className="contact-form-full" onSubmit={handleSubmit}>

                {/* Full Name */}
                <div className="form-field">
                  <span className="form-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={isDisabled}
                  />
                </div>

                {/* Email */}
                <div className="form-field">
                  <span className="form-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isDisabled}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="form-field">
                  <span className="form-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.07 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 5.99 5.99l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isDisabled}
                  />
                </div>

                {/* Message */}
                <div className="form-field form-field--textarea">
                  <span className="form-icon form-icon--top">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </span>
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isDisabled}
                    rows={5}
                  />
                </div>

                {/* Submit */}
                <div className="form-submit-row">
                  {status === "error" && (
                    <p className="form-error">Something went wrong. Please try again.</p>
                  )}
                  {status === "success" && (
                    <p className="form-success">Message sent successfully! ✓</p>
                  )}
                  <button type="submit" className="form-submit-btn" disabled={isDisabled}>
                    {buttonLabel}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                </div>

              </form>
            </div>

          </div>
        </AnimatedSection>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col footer-about">
            <h3>{siteConfig.logo.text}</h3>
            <p>Creative graphic designer specializing in photography, 3D, VFX, and digital design.</p>
            <div className="footer-social">
              {contactData.social.map((s) => {
                const Icon = socialIconMap[s.icon];
                return (
                  <a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name}>
                    {Icon && <Icon />}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>{footerLinks.resources.map((link) => <li key={link.label}><a href={link.href}>{link.label}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul>{footerLinks.support.map((link) => <li key={link.label}><a href={link.href}>{link.label}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p>{contactData.email}</p>
            <p>{contactData.phone}</p>
            <p>{contactData.address}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {siteConfig.logo.text}. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}
import { useState } from "react";
import { heroData } from "../data";
import { FaArtstation, FaInstagram, FaLinkedin, FaXTwitter, FaBehance, FaEnvelope } from "react-icons/fa6";
import { FaBloggerB } from "react-icons/fa6";
import "./Hero.css";

const socialIconMap = {
  FaArtstation,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaBehance,
  FaEnvelope,
  FaBloggerB,
};

export default function Hero() {
  const [videoError, setVideoError] = useState(false);
  const { backgroundVideo, fallbackImage, greeting, name, title, socialLinks, bio } = heroData;

  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        {!videoError && backgroundVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="hero-video"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : (
          <div
            className="hero-fallback"
            style={{ backgroundImage: `url(${fallbackImage})` }}
          />
        )}
      </div>

      <div className="hero-content hero-animate">
        <p className="hero-greeting" style={{ animationDelay: "0.1s" }}>{greeting}</p>
        <h1 className="hero-name" style={{ animationDelay: "0.2s" }}>{name}</h1>
        <p className="hero-title" style={{ animationDelay: "0.35s" }}>{title}</p>
        <div className="hero-social" style={{ animationDelay: "0.45s" }}>
          {(socialLinks || []).map((link) => {
            const Icon = socialIconMap[link.icon];
            return (
              <a key={link.name} href={link.url} target="_blank" rel="noreferrer" aria-label={link.name}>
                {Icon && <Icon />}
              </a>
            );
          })}
        </div>
        <p className="hero-bio" style={{ animationDelay: "0.5s" }}>{bio}</p>
      </div>
    </section>
  );
}
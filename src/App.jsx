/**
 * Main App - Graphic Designer Portfolio
 * All sections are composed here. Edit order by rearranging components.
 * Content is data-driven via src/data.js
 */
import { useEffect, useState } from "react";
import { siteConfig } from "./data";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Software from "./components/Software";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Gallery from "./components/Gallery";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import "./styles/loading.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = siteConfig.title;
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  useEffect(() => {
    const loaderDelay = window.setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => window.clearTimeout(loaderDelay);
  }, []);

  return (
    <>
      <div className={`ap-loader ${isLoading ? "is-active" : "is-hidden"}`}>
        <div className="ap-loader__shield">
          <div className="ap-loader__logo">AP</div>
        </div>
        <p className="ap-loader__tagline">Crafted with performance</p>
      </div>

      <div className={`ap-site-shell ${isLoading ? "is-loading" : "is-ready"}`}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Software />
          <Experience />
          <Gallery />
          <Blog />
          <Certifications />
          <Education />
          <Contact />
        </main>
      </div>
    </>
  );
}

export default App;

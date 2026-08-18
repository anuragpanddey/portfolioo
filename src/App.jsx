/**
 * Main App - Graphic Designer Portfolio
 * All sections are composed here. Edit order by rearranging components.
 * Content is data-driven via src/data.js
 */
import { useCallback, useEffect, useState } from "react";
import { siteConfig } from "./data";
import { AssetsProvider } from "./context/AssetsContext";
import IntroOverlay from "./components/IntroOverlay";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Software from "./components/Software";
import Certifications from "./components/Certifications";
import Experience from "./components/Experience";
import Gallery from "./components/Gallery";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import "./styles/loading.css";
import "./styles/sectionStack.css";

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

  const handleIntroComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <AssetsProvider>
      {isLoading && <IntroOverlay onComplete={handleIntroComplete} />}

      <div className="ap-site-shell">
        <Navbar />
        <main>
          <div className="stack-group">
            <div className="stack-panel"><Hero /></div>
            <div className="stack-panel"><About /></div>
            <div className="stack-panel"><Gallery /></div>
          </div>
          <Skills />
          <Software />
          <Experience />
          <Certifications />
          <Blog />
          <Contact />
        </main>
      </div>
    </AssetsProvider>
  );
}

export default App;

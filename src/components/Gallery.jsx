/**
 * Gallery Section — Masonry grid + Windows-Photos-style lightbox
 *
 * KEY FIX: Lightbox is rendered via ReactDOM.createPortal() directly into
 * document.body — this escapes any parent with transform/will-change/filter/
 * overflow that would otherwise clip or misplace position:fixed elements.
 */
import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Masonry from "react-masonry-css";
import { galleryData, galleryFilters } from "../data";
import AnimatedSection from "./AnimatedSection";
import { GridPattern } from "./Illustrations";
import "./Gallery.css";

const breakpointColumns = { default: 4, 1200: 3, 768: 2, 480: 1 };

/* ── Helpers ────────────────────────────────────────────────────────────── */
const isVideoSrc = (src) => src && /\.(mp4|webm|ogg|mov)$/i.test(src);

const toSlide = (item) => {
  const src = item.video || item.image || "";
  return { src, title: item.title, isVideo: isVideoSrc(src) };
};

/* ═══════════════════  LIGHTBOX COMPONENT  ══════════════════════════════ */
function PhotosLightbox({ slides, startIndex, onClose }) {
  const [idx, setIdx]             = useState(startIndex);
  const [zoom, setZoom]           = useState(1);
  const [animClass, setAnimClass] = useState("lb-img--visible");
  const filmRef                   = useRef(null);
  const touchStartX               = useRef(null);
  const total                     = slides.length;

  /* Lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* Scroll active filmstrip thumb into view */
  useEffect(() => {
    const strip = filmRef.current;
    if (!strip) return;
    const active = strip.querySelector(".lb-thumb--active");
    if (active) active.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [idx]);

  /* Animated navigation */
  const go = useCallback((dir) => {
    const enterClass = dir === "right" ? "lb-img--enter-right" : "lb-img--enter-left";
    setAnimClass("lb-img--exit");
    setTimeout(() => {
      setZoom(1);
      setIdx((i) => dir === "right" ? (i + 1) % total : (i - 1 + total) % total);
      setAnimClass(enterClass);
      requestAnimationFrame(() => setTimeout(() => setAnimClass("lb-img--visible"), 20));
    }, 180);
  }, [total]);

  /* Keyboard */
  useEffect(() => {
    const h = (e) => {
      if      (e.key === "ArrowRight")           go("right");
      else if (e.key === "ArrowLeft")            go("left");
      else if (e.key === "Escape")               onClose();
      else if (e.key === "+" || e.key === "=")  setZoom(z => Math.min(4, +(z + 0.25).toFixed(2)));
      else if (e.key === "-")                    setZoom(z => Math.max(0.25, +(z - 0.25).toFixed(2)));
      else if (e.key === "0")                    setZoom(1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [go, onClose]);

  /* Scroll-to-zoom (images only) */
  const onWheel = useCallback((e) => {
    if (slides[idx]?.isVideo) return;
    e.preventDefault();
    setZoom(z => Math.min(4, Math.max(0.25, +(z + (e.deltaY < 0 ? 0.12 : -0.12)).toFixed(2))));
  }, [slides, idx]);

  /* Touch swipe */
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 48) go(delta > 0 ? "right" : "left");
    touchStartX.current = null;
  };

  const slide   = slides[idx];
  const zoomPct = Math.round(zoom * 100);

  /* ── Portal content ─────────────────────────────────────────────────── */
  const lightboxContent = (
    <div className="lb-root" role="dialog" aria-modal="true" aria-label="Image lightbox">

      {/* TOOLBAR */}
      <div className="lb-toolbar">
        <span className="lb-filename">{slide.title}</span>

        <div className="lb-toolbar-actions">
          {!slide.isVideo && (
            <>
              <button
                className="lb-tb-btn"
                onClick={() => setZoom(z => Math.max(0.25, +(z - 0.25).toFixed(2)))}
                aria-label="Zoom out"
              >
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="8.5" cy="8.5" r="5.5"/>
                  <path d="M6 8.5h5M17 17l-3.5-3.5"/>
                </svg>
              </button>

              <button className="lb-zoom-badge" onClick={() => setZoom(1)} title="Reset zoom">
                {zoomPct}%
              </button>

              <button
                className="lb-tb-btn"
                onClick={() => setZoom(z => Math.min(4, +(z + 0.25).toFixed(2)))}
                aria-label="Zoom in"
              >
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="8.5" cy="8.5" r="5.5"/>
                  <path d="M8.5 6v5M6 8.5h5M17 17l-3.5-3.5"/>
                </svg>
              </button>

              <div className="lb-tb-sep" />
            </>
          )}

          <button className="lb-tb-btn lb-tb-btn--close" onClick={onClose} aria-label="Close lightbox">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4l12 12M16 4L4 16"/>
            </svg>
          </button>
        </div>
      </div>

      {/* STAGE */}
      <div
        className="lb-stage"
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Prev arrow */}
        <button className="lb-arrow lb-arrow--prev" onClick={() => go("left")} aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        {/* Media frame */}
        <div className="lb-frame">
          {slide.isVideo ? (
            <video
              key={`v-${idx}-${slide.src}`}
              src={slide.src}
              className={`lb-img ${animClass}`}
              controls
              autoPlay
              loop
              playsInline
              style={{ maxWidth: "100%", maxHeight: "100%", outline: "none" }}
            />
          ) : (
            <img
              key={`i-${idx}-${slide.src}`}
              src={slide.src}
              alt={slide.title}
              className={`lb-img ${animClass}`}
              style={{ transform: `scale(${zoom})` }}
              draggable={false}
            />
          )}
        </div>

        {/* Next arrow */}
        <button className="lb-arrow lb-arrow--next" onClick={() => go("right")} aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      {/* FILMSTRIP */}
      <div className="lb-film-outer">
        <div className="lb-film" ref={filmRef}>
          {slides.map((s, i) => (
            <button
              key={i}
              className={`lb-thumb${i === idx ? " lb-thumb--active" : ""}`}
              onClick={() => { setZoom(1); setIdx(i); }}
              aria-label={`View ${s.title}`}
              aria-current={i === idx ? "true" : undefined}
            >
              {s.isVideo ? (
                <video
                  src={s.src}
                  muted
                  playsInline
                  preload="metadata"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
                />
              ) : (
                <img src={s.src} alt={s.title} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* STATUS BAR */}
      <div className="lb-status">
        <span className="lb-status__counter">{idx + 1} / {total}</span>
        <span className="lb-status__title">{slide.title}</span>
        <span className="lb-status__zoom">{slide.isVideo ? "▶ video" : `${zoomPct}%`}</span>
      </div>

    </div>
  );

  /* Mount directly on body — escapes ALL parent stacking contexts */
  return createPortal(lightboxContent, document.body);
}

/* ═══════════════════════  GALLERY  ════════════════════════════════════ */
export default function Gallery() {
  const [activeFilter, setActiveFilter]   = useState("all");
  const [lightboxOpen, setLightboxOpen]   = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems =
    activeFilter === "all"
      ? galleryData
      : galleryData.filter((item) => item.category === activeFilter);

  const slides = filteredItems.map(toSlide);

  const openAt = useCallback((i) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  }, []);

  return (
    <section id="portfolio" className="gallery">
      <GridPattern />

      <AnimatedSection variant="fadeUp">
        <h2 className="section-heading">Portfolio</h2>
        <p className="gallery-sub">Let's have a look at my work</p>
      </AnimatedSection>

      {/* Filter tabs */}
      <div className="gallery-filters gallery-filters-animate">
        {galleryFilters.map((filter) => (
          <button
            key={filter}
            className={`gallery-filter${activeFilter === filter ? " active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter === "all" ? "All" : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <Masonry
        breakpointCols={breakpointColumns}
        className="gallery-masonry"
        columnClassName="gallery-column"
      >
        {filteredItems.map((item, index) => {
          const slide = toSlide(item);
          return (
            <div key={item.id} className="gallery-item">
              <button
                type="button"
                className="gallery-open-btn"
                onClick={() => openAt(index)}
                aria-label={`Open ${item.title}`}
              >
                {slide.isVideo ? (
                  <video
                    src={slide.src}
                    className="gallery-img"
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img src={slide.src} alt={item.title} className="gallery-img" />
                )}
              </button>

              {/* Hover overlay — pointer-events:none so clicks pass through to button */}
              <div className="gallery-overlay">
                <span className="gallery-title">
                  {slide.isVideo && (
                    <svg
                      width="13" height="13" viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ marginRight: 5, verticalAlign: "middle" }}
                    >
                      <polygon points="5,3 19,12 5,21"/>
                    </svg>
                  )}
                  {item.title}
                </span>
              </div>
            </div>
          );
        })}
      </Masonry>

      {/* Lightbox — portalled to document.body to escape parent stacking contexts */}
      {lightboxOpen && (
        <PhotosLightbox
          slides={slides}
          startIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
}
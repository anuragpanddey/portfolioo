/**
 * Full-screen cinematic media viewer for the Gallery/DriftWall.
 * Portalled to document.body so it always sits above the 3D-transformed
 * drift wall regardless of stacking-context quirks.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./GalleryLightbox.css";

export default function GalleryLightbox({ items, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const total = items.length;
  const item = items[index];
  const thumbStripRef = useRef(null);

  const goTo = useCallback(
    (next) => setIndex(((next % total) + total) % total),
    [total]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Lock page scroll while open.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Keyboard navigation.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, next, prev]);

  // Keep the active thumbnail scrolled into view.
  useEffect(() => {
    const strip = thumbStripRef.current;
    if (!strip) return;
    const activeThumb = strip.querySelector(".gallery-lightbox__thumb--active");
    activeThumb?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  if (!item) return null;
  const isVideo = !!item.video && !item.image;

  const content = (
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.title || "Media viewer"}
    >
      <button className="gallery-lightbox__close" onClick={onClose} aria-label="Close viewer">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      </button>

      {total > 1 && (
        <>
          <button className="gallery-lightbox__arrow gallery-lightbox__arrow--prev" onClick={prev} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button className="gallery-lightbox__arrow gallery-lightbox__arrow--next" onClick={next} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      <div className="gallery-lightbox__stage">
        {isVideo ? (
          <video
            key={item.video}
            src={item.video}
            className="gallery-lightbox__media"
            controls
            autoPlay
            playsInline
          />
        ) : (
          <img
            key={item.image}
            src={item.image}
            alt={item.title || ""}
            className="gallery-lightbox__media"
            draggable={false}
          />
        )}
      </div>

      {item.title && <p className="gallery-lightbox__title">{item.title}</p>}

      <div className="gallery-lightbox__counter">
        {index + 1} / {total}
      </div>

      {total > 1 && (
        <div className="gallery-lightbox__thumbs" ref={thumbStripRef}>
          {items.map((it, i) => {
            const thumbIsVideo = !!it.video && !it.image;
            return (
              <button
                key={i}
                className={`gallery-lightbox__thumb${i === index ? " gallery-lightbox__thumb--active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`View ${it.title || `item ${i + 1}`}`}
                aria-current={i === index ? "true" : undefined}
              >
                {thumbIsVideo ? (
                  <video src={it.video} muted playsInline preload="metadata" />
                ) : (
                  <img src={it.image} alt="" loading="lazy" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  return createPortal(content, document.body);
}

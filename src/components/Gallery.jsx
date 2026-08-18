/**
 * Gallery Section — Portfolio drift wall (filterable by category)
 * Clicking a tile opens the full-screen GalleryLightbox instead of
 * navigating to the raw Supabase asset URL.
 */
import { useEffect, useMemo, useState } from "react";
import { galleryData as localGalleryData, galleryFilters } from "../data";
import { useAssets } from "../context/assetsContextStore";
import { GridPattern } from "./Illustrations";
import DriftWall from "./DriftWall";
import GalleryLightbox from "./GalleryLightbox";
import TextType from "./TextType";
import "./Gallery.css";

function useResponsiveColumns() {
  const [columns, setColumns] = useState(5);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w <= 480) setColumns(2);
      else if (w <= 768) setColumns(3);
      else if (w <= 1100) setColumns(4);
      else setColumns(5);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return columns;
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { galleryItems } = useAssets();
  const galleryData = galleryItems.length > 0 ? galleryItems : localGalleryData;
  const columns = useResponsiveColumns();

  const filteredItems =
    activeFilter === "all"
      ? galleryData
      : galleryData.filter((item) => item.category === activeFilter);

  // Several assets intentionally belong to more than one category (e.g. a1 is
  // in Advertisement, Photoshoot and Graphics), so the "all" view would
  // otherwise render — and the lightbox would page through — the same file
  // several times. Key by media URL so every asset appears exactly once.
  const wallItems = useMemo(() => {
    const seen = new Set();
    return filteredItems
      .filter((item) => item.image || item.video)
      .filter((item) => {
        const key = item.image || item.video;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((item) => ({
        image: item.image,
        video: item.video,
        title: item.title,
      }));
  }, [filteredItems]);

  const openLightboxAt = (item) => {
    const idx = wallItems.indexOf(item);
    if (idx !== -1) setLightboxIndex(idx);
  };

  return (
    <section id="portfolio" className="gallery">
      <GridPattern />

      <TextType as="h2" className="section-heading" text="Portfolio" startOnVisible loop={false} />
      <p className="gallery-sub">Let's have a look at my work</p>

      <div className="gallery-filters">
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

      <div className="gallery-drift-shell">
        {wallItems.length > 0 ? (
          <DriftWall
            items={wallItems}
            columns={columns}
            tileWidth={200}
            tileHeight={132}
            gap={18}
            tilt={16}
            turn={-14}
            perspective={1200}
            depth={120}
            speed={42}
            direction="up"
            variance={0.45}
            parallax={0.6}
            lift={64}
            fade={0.6}
            dim={0.85}
            overlayColor="#060010"
            onTileClick={openLightboxAt}
          />
        ) : (
          <p className="gallery-empty">No items in this category yet.</p>
        )}
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          items={wallItems}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}

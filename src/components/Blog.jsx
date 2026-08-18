/**
 * Blog Section (reference: fourth image)
 * - Card hover lift + staggered grid animation
 * - Opens detail overlay on card click
 */
import { useCallback } from "react";
import { blogData } from "../data";
import { useAssets } from "../context/assetsContextStore";
import AnimatedSection from "./AnimatedSection";
import { CornerAccent } from "./Illustrations";
import TextType from "./TextType";
import "./Blog.css";

export default function Blog() {
  const { assets } = useAssets();
  const openPost = useCallback((post) => {
    if (post.url) {
      window.open(post.url, "_blank", "noopener,noreferrer");
    }
  }, []);

  return (
    <section id="blog" className="blog">
      <CornerAccent position="top-left" />
      <AnimatedSection variant="fadeUp">
        <div className="blog-header">
          <TextType as="h2" className="section-heading" text="From My Blog" startOnVisible loop={false} />
          <a href="#blog" className="blog-view-all">View All</a>
        </div>
      </AnimatedSection>
      <div className="blog-grid">
        {blogData.map((post, i) => {
          const image = assets[`blog_${post.id}`]?.url || post.image;
          const isVideo = /\.(mp4|webm|mov)$/i.test(image || "");
          return (
          <AnimatedSection key={post.id} variant="fadeUp" delay={i * 80}>
            <article
              className="blog-card blog-card--interactive"
              role="button"
              tabIndex={0}
              onClick={() => openPost(post)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openPost(post);
                }
              }}
            >
              <div className="blog-image-wrap">
                {image && (
                  isVideo ? (
                    <video
                      src={image}
                      className="blog-image"
                      muted
                      autoPlay
                      loop
                      playsInline
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  ) : (
                    <img
                      src={image}
                      alt={post.title}
                      className="blog-image"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  )
                )}
                <span className="blog-category">{post.category}</span>
              </div>
              <div className="blog-content">
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-meta">{post.author} • {post.date}</p>
                <p className="blog-excerpt">{post.excerpt}</p>
              </div>
            </article>
          </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}
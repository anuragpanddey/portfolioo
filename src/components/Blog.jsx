/**
 * Blog Section (reference: fourth image)
 * - Card hover lift + staggered grid animation
 * - Opens detail overlay on card click
 */
import { useCallback } from "react";
import { blogData } from "../data";
import AnimatedSection from "./AnimatedSection";
import { CornerAccent } from "./Illustrations";
import "./Blog.css";

export default function Blog() {
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
          <h2 className="section-heading">From My Blog</h2>
          <a href="#blog" className="blog-view-all">View All</a>
        </div>
      </AnimatedSection>
      <div className="blog-grid">
        {blogData.map((post, i) => (
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
                <img src={post.image} alt={post.title} className="blog-image" />
                <span className="blog-category">{post.category}</span>
              </div>
              <div className="blog-content">
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-meta">{post.author} • {post.date}</p>
                <p className="blog-excerpt">{post.excerpt}</p>
              </div>
            </article>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
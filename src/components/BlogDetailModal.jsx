import { useEffect, useId } from "react";
import { IoClose } from "react-icons/io5";
import "./BlogDetailModal.css";

export default function BlogDetailModal({ post, onClose }) {
  const titleId = useId();

  useEffect(() => {
    if (!post) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [post, onClose]);

  if (!post) return null;

  const description = post.content ?? post.excerpt;

  return (
    <div
      className="blog-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="blog-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <IoClose aria-hidden />
        </button>
        <div className="blog-modal__media">
          <img src={post.image} alt="" className="blog-modal__image" />
        </div>
        <div className="blog-modal__body">
          <span className="blog-modal__category">{post.category}</span>
          <h2 id={titleId} className="blog-modal__title">
            {post.title}
          </h2>
          <p className="blog-modal__author">
            <span className="blog-modal__author-label">By</span> {post.author}
            <span className="blog-modal__dot" aria-hidden>
              {" "}
              •{" "}
            </span>
            <time dateTime={post.date}>{post.date}</time>
          </p>
          <p className="blog-modal__description">{description}</p>
        </div>
      </div>
    </div>
  );
}

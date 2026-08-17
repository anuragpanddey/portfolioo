/**
 * AnimatedSection - Wraps content with scroll-triggered animations
 * Variants: fadeUp, fadeIn, slideLeft, slideRight, scale
 */
import { useInView } from "../hooks/useInView";

export default function AnimatedSection({
  children,
  className = "",
  variant = "fadeUp",
  delay = 0,
  stagger = false,
}) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`animate-section animate-${variant} ${isInView ? "animate-visible" : ""} ${className}`}
      style={{ "--animate-delay": `${delay}ms` }}
      data-stagger={stagger || undefined}
    >
      {children}
    </div>
  );
}

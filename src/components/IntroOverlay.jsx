/**
 * Loading / intro video.
 *
 * Plays the intro clip full-screen once; when it finishes (or errors, or
 * the user has reduced-motion enabled) it fades out and hands off to the
 * real Hero underneath, which has been mounted and playing this whole time.
 */
import { useEffect, useRef, useState } from "react";
import { useAssets } from "../context/assetsContextStore";
import "./IntroOverlay.css";

const FADE_MS = 400;
const FALLBACK_TIMEOUT_MS = 8000;
const NO_VIDEO_HOLD_MS = 800;
const PLAYBACK_RATE = 2;

export default function IntroOverlay({ onComplete }) {
  const [fading, setFading] = useState(false);
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
  const videoRef = useRef(null);
  const doneRef = useRef(false);
  const { assets, loading } = useAssets();
  const introVideo = assets.hero_intro?.url || "";

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setFading(true);
    window.setTimeout(onComplete, FADE_MS);
  };

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = PLAYBACK_RATE;
  }, [introVideo]);

  useEffect(() => {
    if (reducedMotion) {
      const t = window.setTimeout(finish, 300);
      return () => window.clearTimeout(t);
    }
    // Still fetching the asset list from Supabase - wait for it to settle
    // before deciding whether there's actually a video to play, so we don't
    // skip straight past it just because the fetch hasn't resolved yet.
    if (loading) return undefined;
    if (!introVideo) {
      const t = window.setTimeout(finish, NO_VIDEO_HOLD_MS);
      return () => window.clearTimeout(t);
    }
    // Safety net: never trap a visitor behind the intro if the video stalls.
    const fallback = window.setTimeout(finish, FALLBACK_TIMEOUT_MS);
    return () => window.clearTimeout(fallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, loading, introVideo]);

  if (reducedMotion) {
    return <div className="intro-overlay intro-overlay--reduced" aria-hidden="true" />;
  }

  return (
    <div className={`intro-overlay${fading ? " intro-overlay--fading" : ""}`} aria-hidden="true">
      {introVideo ? (
        <video
          ref={videoRef}
          src={introVideo}
          className="intro-overlay__video"
          autoPlay
          muted
          playsInline
          onLoadedMetadata={(e) => { e.currentTarget.playbackRate = PLAYBACK_RATE; }}
          onEnded={finish}
          onError={finish}
        />
      ) : (
        <div className="intro-overlay__base" />
      )}
    </div>
  );
}

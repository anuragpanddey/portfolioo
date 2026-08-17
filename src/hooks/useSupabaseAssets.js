import { useEffect, useState } from "react";
import { supabase, getPublicAssetUrl } from "../lib/supabaseClient";

const EMPTY_STATE = {
  assets: {},
  galleryItems: [],
  loading: false,
};

/**
 * Fetches the `assets` key/value registry and `gallery_items` collection
 * from Supabase once on mount. Resolves storage paths to public URLs.
 * Fails soft: on any error (missing client, network, missing tables) it
 * logs a warning and resolves to empty results so callers fall back to
 * whatever is already in data.js.
 */
export function useSupabaseAssets() {
  const [state, setState] = useState(
    supabase ? { ...EMPTY_STATE, loading: true } : EMPTY_STATE
  );

  useEffect(() => {
    if (!supabase) return;

    let cancelled = false;

    async function load() {
      try {
        const [assetsRes, galleryRes] = await Promise.all([
          supabase.from("assets").select("key, storage_path, alt_text"),
          supabase
            .from("gallery_items")
            .select("id, title, category, storage_path, media_type, sort_order")
            .order("sort_order", { ascending: true }),
        ]);

        if (assetsRes.error) throw assetsRes.error;
        if (galleryRes.error) throw galleryRes.error;

        const assets = {};
        for (const row of assetsRes.data || []) {
          const url = getPublicAssetUrl(row.storage_path);
          if (url) assets[row.key] = { url, altText: row.alt_text || "" };
        }

        const galleryItems = (galleryRes.data || [])
          .map((row) => {
            const url = getPublicAssetUrl(row.storage_path);
            if (!url) return null;
            return {
              id: row.id,
              title: row.title,
              category: row.category,
              image: row.media_type === "image" ? url : undefined,
              video: row.media_type === "video" ? url : undefined,
            };
          })
          .filter(Boolean);

        if (!cancelled) {
          setState({ assets, galleryItems, loading: false });
        }
      } catch (err) {
        console.warn("[supabase] Failed to load remote assets, using local fallbacks:", err);
        if (!cancelled) setState({ ...EMPTY_STATE, loading: false });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

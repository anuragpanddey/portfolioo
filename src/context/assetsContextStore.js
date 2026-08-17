import { createContext, useContext } from "react";

export const AssetsContext = createContext({ assets: {}, galleryItems: [], loading: false });

export function useAssets() {
  return useContext(AssetsContext);
}

/** Returns a remote asset URL for `key`, or `fallback` if unavailable. */
export function useAsset(key, fallback) {
  const { assets } = useAssets();
  return assets[key]?.url || fallback;
}

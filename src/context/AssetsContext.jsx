import { useSupabaseAssets } from "../hooks/useSupabaseAssets";
import { AssetsContext } from "./assetsContextStore";

export function AssetsProvider({ children }) {
  const value = useSupabaseAssets();
  return <AssetsContext.Provider value={value}>{children}</AssetsContext.Provider>;
}

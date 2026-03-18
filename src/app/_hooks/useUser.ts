import { useContext } from "react";
import { UserContext } from "../_providers";

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within CatalogProvider');

  return context;
}

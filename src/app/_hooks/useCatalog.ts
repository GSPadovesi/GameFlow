import { useContext } from "react";
import { CatalogContext } from "../_providers";

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) throw new Error('useCatalog must be used within CatalogProvider');

  return context;
}

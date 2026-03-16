import { CatalogProvider } from "../_providers/CatalogProvider/CatalogProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CatalogProvider>
      {children}
    </CatalogProvider>
  )
}

'use client'

import { Suspense } from "react";
import { CatalogPage } from "../_components/Pages/CatalogPage/Catalog";

export default function Page() {
  return <Suspense fallback={<div>Loading...</div>}>
    <CatalogPage />
  </Suspense>
}

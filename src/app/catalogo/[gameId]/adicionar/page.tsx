'use client'

import { AddGamePage } from "@/app/_components/Pages";
import { Suspense } from "react";

export default function Page() {
  return <Suspense fallback={<div>Loading...</div>}>
    <AddGamePage />
  </Suspense>
}

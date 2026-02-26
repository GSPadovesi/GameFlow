'use client'

import { Suspense } from "react";
import styles from "../page.module.css";
import Image from "next/image";
import { HomePage } from "../_components/Pages";



export default function Home() {
  return <Suspense fallback={<div>Loading...</div>}>
    <HomePage />
  </Suspense>
}

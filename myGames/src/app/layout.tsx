import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MainTemplate } from "./_components/Templates";
import '@/app/_styles/globals.scss';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "GameFlow",
    template: "%s | GameFlow",
  },
  description: "Plataforma inicial para organizacao e acompanhamento de jogos.",
  applicationName: "GameFlow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MainTemplate>
          {children}
        </MainTemplate>
      </body>
    </html>
  );
}

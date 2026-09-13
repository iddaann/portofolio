import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ganti-dengan-domain-asli.vercel.app"),
  title: "Muhamad Ramdhani Fathul Muttaqin",
  description:
    "Portfolio Muhamad Ramdhani Fathul Muttaqin — Backend & Full-Stack Developer (Golang, Laravel, Next.js, React).",
  openGraph: {
    title: "Muhamad Ramdhani Fathul Muttaqin",
    description: "Backend & Full-Stack Developer — Golang, Laravel, Next.js, React",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhamad Ramdhani Fathul Muttaqin",
    description: "Backend & Full-Stack Developer — Golang, Laravel, Next.js, React",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <div
          className="pointer-events-none fixed inset-0 z-[70] opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </body>
    </html>
  );
}
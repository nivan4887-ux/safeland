import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SafeLand | NER Early Warning System",
  description: "AI-driven early warning and real-time multi-hazard monitoring for North-Eastern India."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

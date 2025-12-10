import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const heading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const body = Poppins({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Vœux de fin d’année 2026",
  description: "Carte de vœux élégante et personnalisée pour la nouvelle année.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${heading.variable} ${body.variable} font-sans bg-night text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

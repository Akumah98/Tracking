import type { Metadata } from "next";
import { Inter, Sen } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sen = Sen({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-sen",
  display: "swap",
});

export const metadata: Metadata = {
  title: "International Transport Line | Transporting Goods Round The Globe",
  description:
    "Express postal and global freight logistics. Transporting goods round the globe safely, on time, and with care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sen.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}

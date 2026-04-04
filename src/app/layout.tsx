import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import { Inter } from "next/font/google";
import { Manrope } from "next/font/google";
import PageReveal from "./components/PageReveal";
import TransitionProvider from "./components/TransitionProvider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "700",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  title: "Thrihash — AI Design Engineer",
  description:
    "AI design engineer partner with focus on design experiences. I help Startups, Business & Brands to build a strong online presence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${instrumentSerif.variable} ${inter.variable} ${manrope.variable} antialiased`}
    >
      <body>
          <TransitionProvider>
            <PageReveal>{children}</PageReveal>
          </TransitionProvider>
        </body>
    </html>
  );
}

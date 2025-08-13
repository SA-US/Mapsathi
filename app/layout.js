import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";

export const metadata = {
  title: "MapsArthi — Explore maps & local guides",
  description: "MapsArthi — intuitive maps, curated routes and local travel guides.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body>
        {children}
        
      </body>
    </html>
  );
}

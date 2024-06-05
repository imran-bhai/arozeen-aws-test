// app/fonts.js

import {Inter, Poppins, Space_Grotesk, Noto_Nastaliq_Urdu } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"], // Adjust subsets based on your needs
  weight: ["300", "400", "500", "600", "700"], // Choose the weights you'll use
  display: "swap", // Improve perceived performance
  variable: "--font-poppins", // Optional: for use with CSS variables
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});
export const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-nastaliq",
});

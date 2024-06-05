import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./store/Provider";
import { poppins, spaceGrotesk, notoNastaliq, inter } from "./config/font";



export const metadata = {
  title: "Arozeen",
  description:
    "Arozeen E-Commerce Store, Pakistan Largest Vendor base E-commerce Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={` h-full `}>
      <body className={cn(`${poppins.variable} ${spaceGrotesk.variable} ${notoNastaliq.variable} ${inter.variable} antialiased`)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

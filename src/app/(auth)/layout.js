import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import localfont from "next/font/local";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "../store/Provider";

const inter = Inter({ subsets: ["latin"] });



export const metadata = {
  title: "Aroozen",
  description:
    "Arozeen E-Commerce Store, so now you can buy everything from here.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={` h-full `}>
      <body
        className={cn(
          "relative h-full font-sans antialiased",
          inter.className
        )}>
        <ToastContainer autoClose={1000}/>
        <Providers >
          <main className="relative flex flex-col min-h-screen">
            <div className="flex-grow flex-1">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}

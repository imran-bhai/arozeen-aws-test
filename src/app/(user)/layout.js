import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import localfont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopBar from "@/components/topBar/TopBar";
import { cookies } from "next/headers";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Arozeen",
  description:
    "Arozeen E-Commerce Store, so now you can buy everything from here.",
};

export default function RootLayout({ children }) {
  const cookie = cookies();
  const token = cookie.get("token");

  return (
    <html lang="en" className=" h-full">
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <ToastContainer autoClose={1000} />

        {/* {token?.value ? "" : <TopBar />} */}
        <div className="md:fixed md:bg-gray-100 w-full md:top-0 md:z-50 ">
          <Navbar />
        </div>
        <main className="relative flex flex-col min-h-screen">
          <div className="flex-grow flex-1">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}

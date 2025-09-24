// app/layout.jsx
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PreloaderWrapper from "@/components/Preloader/PreloaderWrapper";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-mont-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cleaning Service",
  description: "Professional monthly bathroom cleaning services in Hyderabad.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >

      <body className={plusJakartaSans.className}>
        <div className="antialiased flex flex-col  min-h-screen">
          <Header />
          <main className="pt-15 pb-20 overflow-auto" >{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

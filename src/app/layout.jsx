// app/layout.jsx
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import LayoutWrapper from "@/components/LayoutWrapper";

import PreloaderWrapper from "@/components/Preloader/PreloaderWrapper";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans", // updated variable name for clarity
});

export const metadata = {
  title: "Cleaning Service",
  description: "Professional monthly bathroom cleaning services in Hyderabad.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.className} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
            <LayoutWrapper>{children}</LayoutWrapper>

          <Footer />
        </div>
      </body>
    </html>
  );
}

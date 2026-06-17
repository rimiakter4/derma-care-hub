
import { Geist, Geist_Mono } from "next/font/google"; 
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/component/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Footer from "@/component/Footer";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DermaCare Hub",
  description: "Your skincare partner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ThemeProvider এবং Providers এর ভেতরে সব রাখা হয়েছে */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Providers>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <ToastContainer position="top-right" autoClose={3000} />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
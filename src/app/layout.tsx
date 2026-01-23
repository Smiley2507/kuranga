'use client';

import { usePathname } from 'next/navigation';
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/ui/Toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/admin') || pathname.startsWith('/partner');

  return (
    <html lang="en" className={`${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="light" storageKey="kuranga-theme">
          <ToastProvider>
            <SmoothScroll />
            {!isDashboard && <Header />}
            <main className={isDashboard ? "" : "min-h-screen"}>
              {children}
            </main>
            {!isDashboard && <Footer />}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

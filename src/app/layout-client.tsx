'use client'
import { useState, useEffect } from 'react';
import { ThemeProvider } from "@/components/providers/theme-provider";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Preloader from '@/components/Preloader';

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show preloader for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {isLoading ? (
          <Preloader />
        ) : (
          <FirebaseClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <GridBackground />
              <Navbar />
              {children}
              <Footer />
              <Toaster />
            </ThemeProvider>
          </FirebaseClientProvider>
        )}
      </body>
    </html>
  );
}

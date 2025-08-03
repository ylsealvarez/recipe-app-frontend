'use client';
import React, { Suspense } from 'react';
import Providers from './providers';
import { Outfit } from "next/font/google";
import Header from "app/components/shared/Header/Header";
import { Sidebar } from "app/components/shared/Sidebar";
import { Footer } from "app/components/shared/Footer";
import { StripeProvider } from "app/components/StripeProvider/StripeProvider";
import 'app/sass/globals.sass'

const outfit = Outfit({
  weight: ["100", "300", "500", "700"],
  subsets: ["latin"],
});

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Providers>
          <Header />
          <Sidebar />
          <Suspense fallback={null}>
            <StripeProvider>{children}</StripeProvider>
          </Suspense>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

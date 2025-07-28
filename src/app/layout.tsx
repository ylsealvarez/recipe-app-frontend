'use client'
import React from 'react';
import { AuthProvider } from 'app/context/AuthContext';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <AuthProvider>
          <Header />
          <Sidebar />
          <StripeProvider>{children}</StripeProvider>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

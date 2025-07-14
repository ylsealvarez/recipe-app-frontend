import { Outfit } from "next/font/google";
import { Header } from "app/components/shared/Header";
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
        <Header />
        {children}
      </body>
    </html>
  );
}

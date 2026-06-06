import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shop Store",
  description: "Ecommerce store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${inter.className}`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Playfair_Display } from 'next/font/google';
import "./globals.css";
import Noise from "@/components/Noise";
import CustomCursor from "@/components/Cursor";

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans' 
});

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-serif',
  style: 'italic'
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://victoria.design"),
  title: "Victoria | Motion & Visual Direction",
  description: "Senior Motion Designer specializing in cinematic brand experiences and kinetic visual identities.",
  openGraph: {
    title: "Victoria | Motion & Visual Direction",
    description: "Transforming static concepts into kinetic experiences.",
    url: "https://victoria.design",
    siteName: "Victoria Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Victoria | Motion & Visual Direction",
    description: "Senior Motion Designer & Art Director.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-stone-950 text-stone-100 bg-mesh">
        {/* Subtle background grain effect for that cinematic feel */}
        <div className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <Noise />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

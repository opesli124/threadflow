import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ThreadFlow - AI Tweet Rewriter | Make Your Tweets Go Viral",
  description: "Transform your tweets into engaging, viral-ready content. Choose from 5 styles: Professional, Casual, Witty, Educational, or Story. Powered by Claude AI.",
  keywords: ["tweet", "twitter", "AI", "rewriter", "viral", "content creator", "social media"],
  authors: [{ name: "ThreadFlow" }],
  openGraph: {
    title: "ThreadFlow - AI Tweet Rewriter",
    description: "Transform your tweets into engaging, viral-ready content.",
    type: "website",
    url: "https://opesli124.github.io/threadflow/",
    siteName: "ThreadFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "ThreadFlow - AI Tweet Rewriter",
    description: "Transform your tweets into engaging, viral-ready content.",
    creator: "@threadflow",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

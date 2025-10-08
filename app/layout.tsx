import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import MainLayout from "@/components/layout/MainLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Content Labs 416 — AI Marketing Hub",
    template: "%s | Content Labs 416"
  },
  description:
    "Content Labs 416 — an AI agents and copilots platform for marketers. Competitor analysis, content, and campaigns without the routine work.",
  keywords: [
    "AI marketing",
    "competitor analysis",
    "content copilot",
    "email automation",
    "ads generation"
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}

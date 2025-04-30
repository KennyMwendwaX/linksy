import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Linksly",
  description:
    "Linksly is a link management tool that helps you create beautiful and customizable link pages.",
  keywords: [
    "link management",
    "link shortener",
    "link page",
    "link in bio",
    "link management tool",
    "link shortener tool",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}

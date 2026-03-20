import type { Metadata } from "next";
import { Work_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

// Use a modern and clean sans-serif font Work Sans and code font Fira Code
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-modern-sans",
});
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-modern-mono",
});

export const metadata: Metadata = {
  title: "Heyama Testing",
  description: "Fullstack capabilities project",
  icons: {
    icon: "/image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        workSans.variable,
        firaCode.variable,
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

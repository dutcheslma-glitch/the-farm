import type { Metadata } from "next";
import { Dancing_Script, Lato, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap"
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap"
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-dancing",
  display: "swap"
});

export const metadata: Metadata = {
  title: "The Farm — Progress Dashboard",
  description: "Client progress dashboard for The Farm's social media management engagement."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable} ${dancingScript.variable}`}>
      <body className="flex min-h-screen font-sans text-ink">
        <Sidebar />
        <main className="min-w-0 flex-1 max-w-content px-11 pb-20 pt-8">{children}</main>
      </body>
    </html>
  );
}

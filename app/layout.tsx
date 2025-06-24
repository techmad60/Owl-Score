import type { Metadata } from "next";
import { Geist, Irish_Grover } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const irishGrover = Irish_Grover({
  variable: "--font-irish-grover",
  subsets: ["latin"],
  weight: "400"
});
export const metadata: Metadata = {
  title: "Owl Score",
  description: "Your go-to GPA calculator. No logins, no fuss — just quick, clear results and a little wise encouragement along the way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${irishGrover.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

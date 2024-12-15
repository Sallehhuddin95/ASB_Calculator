import type { Metadata } from "next";
import localFont from "next/font/local";
import { Provider } from "@/components/ui/provider";
import "./globals.css"; // Ensure that your global styles are being imported here

// Load custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ASB Financing Calculator", // Update title to match your app's name
  description:
    "A simple ASB financing calculator for strategy selection and financial planning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`} // Adding a background color for better contrast
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

import ServiceWorkerRegister from "./component/ServiceWorkerRegister";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mandro",
  description: "Mandro RaspberryPI Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}

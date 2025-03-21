import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Datasets",
  description: "An app to manage datasets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

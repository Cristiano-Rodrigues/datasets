import type { Metadata } from "next"
import { Raleway } from 'next/font/google'
import "./globals.css"

const raleway = Raleway({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Datasets",
  description: "An app to manage datasets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.className} antialiased`}cz-shortcut-listen="true">
        {children}
      </body>
    </html>
  )
}

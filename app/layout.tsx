import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Chiyembekezo Scholar Foundation - Supporting Education Through Scholarships",
  description: "Empowering students through scholarships and educational sponsorships. Help us create brighter futures through quality education and academic support.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon-large.png", sizes: "192x192", type: "image/png" },
      { url: "/logo-removebg-preview.png", sizes: "64x64", type: "image/png" },
      { url: "/logo-removebg-preview.png", sizes: "48x48", type: "image/png" },
      { url: "/logo-removebg-preview.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon-large.png",
    apple: "/favicon-large.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

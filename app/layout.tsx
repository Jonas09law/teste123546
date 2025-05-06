import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Marcelo Portfolio",
  description: "My Personal Portfolio <3"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-[#262624]">
      <body className="bg-[#262624] text-[#4a4a46]">{children}</body>
    </html>
  )
}

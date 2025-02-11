import type { Metadata } from "next"

import { Providers } from "./_components/providers"

import { NavBar } from "./_components/nav-bar"
import "./globals.css"

export const metadata: Metadata = {
  title: "Coin Voyage Next.js Example",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="space-y-4 mx-auto max-w-2xl p-8 lg:max-w-7xl">
            <NavBar />
            {props.children}
          </main>
        </Providers>
      </body>
    </html>
  )
}

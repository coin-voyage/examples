'use client'

import { usePathname } from "next/navigation"

export function NavBar() {
    const pathname = usePathname()
    
    return (
        <nav className="flex space-x-4">
            <a
                href="/"
                className={pathname === "/" ? "underline" : "hover:underline"}>
                Payment Example
            </a>
            <a
                href="/deposit"
                className={pathname.includes("deposit") ? "underline" : "hover:underline"}>
                Deposit Example
            </a>
        </nav>
    )
}
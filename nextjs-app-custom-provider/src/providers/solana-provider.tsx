'use client'

import {
    ConnectionProvider,
    WalletProvider
} from "@solana/wallet-adapter-react"

const endpoint = "my-solana-endpoint" // Replace with your Solana endpoint

export function SolanaProvider({ children }: { children: React.ReactNode }) {
    return (
        <ConnectionProvider endpoint={endpoint} >
            <WalletProvider
                localStorageKey="your-solana-provider"
                wallets={[]}
            >
                {children}
            </WalletProvider>
        </ConnectionProvider>
    )
}

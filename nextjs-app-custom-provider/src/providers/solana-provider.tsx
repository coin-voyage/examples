'use client'

import {
    ConnectionProvider,
    WalletProvider
} from "@solana/wallet-adapter-react"

const endpoint = "https://api.mainnet-beta.solana.com"

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

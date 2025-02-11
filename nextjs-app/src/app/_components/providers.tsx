"use client"

import { PayKitProvider, WalletProvider } from "@coin-voyage/paykit"
import { WalletConfiguration } from "@coin-voyage/paykit/types"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_COIN_VOYAGE_API_KEY) {
    throw new Error("NEXT_PUBLIC_COIN_VOYAGE_API_KEY is required")
  }

  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider config={{
        walletConfig: {
          solana: {
            rpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_URL
          }
        } as WalletConfiguration
      }}>
        <PayKitProvider apiKey={process.env.NEXT_PUBLIC_COIN_VOYAGE_API_KEY}>
          {children}
        </PayKitProvider>
      </WalletProvider>
    </QueryClientProvider>
  )
}

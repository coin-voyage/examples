"use client"

import { PayKitProvider, WalletProvider } from "@coin-voyage/paykit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { SolanaProvider } from "./solana-provider"
import { SuiProvider } from "./sui-provider"

const queryClient = new QueryClient()
const environment =
  process.env.NEXT_PUBLIC_COIN_VOYAGE_ENVIRONMENT ?? "production";
const apiKey = process.env.NEXT_PUBLIC_COIN_VOYAGE_API_KEY || "";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiProvider>
        <SolanaProvider>
          <WalletProvider>
            <PayKitProvider apiKey={apiKey} environment={environment}>
              {children}
            </PayKitProvider>
          </WalletProvider>
        </SolanaProvider>
      </SuiProvider>
    </QueryClientProvider>
  )
}

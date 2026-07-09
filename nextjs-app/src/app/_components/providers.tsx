"use client";

import { PayKitProvider, WalletProvider } from "@coin-voyage/paykit";
import type { APIEnvironment } from "@coin-voyage/paykit/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const environment = (process.env.NEXT_PUBLIC_COIN_VOYAGE_ENVIRONMENT ??
  "production") as APIEnvironment;
const apiKey = process.env.NEXT_PUBLIC_COIN_VOYAGE_API_KEY || "";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <PayKitProvider apiKey={apiKey} environment={environment}>
          {children}
        </PayKitProvider>
      </WalletProvider>
    </QueryClientProvider>
  );
}

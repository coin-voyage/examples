"use client"

import { createDAppKit, DAppKitProvider } from "@mysten/dapp-kit-react"
import { SuiGrpcClient } from "@mysten/sui/grpc"

const GRPC_URLS = {
  mainnet: "https://fullnode.mainnet.sui.io:443",
  devnet: "https://fullnode.devnet.sui.io:443",
}

const dAppKit = createDAppKit({
  networks: ["mainnet", "devnet"],
  defaultNetwork: "mainnet",
  createClient(network) {
    return new SuiGrpcClient({ network, baseUrl: GRPC_URLS[network] })
  },
  storageKey: "your-sui-provider",
  slushWalletConfig: null,
})

export function SuiProvider({ children }: { children: React.ReactNode }) {
  return <DAppKitProvider dAppKit={dAppKit}>{children}</DAppKitProvider>
}

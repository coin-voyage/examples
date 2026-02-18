"use server";

import { ApiClient, type APIResponse } from "@coin-voyage/paykit/server";
import {
  type PayOrder,
  type PayOrderMetadata,
} from "@coin-voyage/paykit/types";

export interface PayOrderProps {
  valueUsd: number;
  metadata: PayOrderMetadata;
}

export async function createPayOrder(
  props: Partial<PayOrderProps>,
): Promise<APIResponse<PayOrder>> {
  if (!props.valueUsd) {
    throw new Error("valueUsd is required");
  }

  if (
    !process.env.NEXT_PUBLIC_COIN_VOYAGE_API_KEY ||
    !process.env.COIN_VOYAGE_API_SECRET
  ) {
    throw new Error("API key and secret are required");
  }

  const apiClient = ApiClient({
    apiKey: process.env.NEXT_PUBLIC_COIN_VOYAGE_API_KEY,
    environment:
      process.env.NEXT_PUBLIC_COIN_VOYAGE_ENVIRONMENT ?? "production",
  });

  return apiClient.createSalePayOrder(
    {
      intent: {
        amount: {
          fiat: {
            amount: props.valueUsd,
            unit: "USD",
          },
        },
      },
      metadata: props.metadata,
    },
    process.env.COIN_VOYAGE_API_SECRET,
  );
}

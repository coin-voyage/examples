"use server";

import { ApiClient, type APIResponse } from "@coin-voyage/paykit/server";
import {
  APIEnvironment,
  type Order,
  type OrderMetadata,
} from "@coin-voyage/paykit/types";

export interface OrderProps {
  valueUsd: number;
  metadata: OrderMetadata;
}

export async function createOrder(
  props: Partial<OrderProps>,
): Promise<APIResponse<Order>> {
  if (!props.valueUsd) {
    throw new Error("valueUsd is required");
  }

  if (
    !process.env.NEXT_PUBLIC_COIN_VOYAGE_API_KEY ||
    !process.env.COIN_VOYAGE_API_SECRET
  ) {
    throw new Error("API key and secret are required");
  }

  const environment = (process.env.NEXT_PUBLIC_COIN_VOYAGE_ENVIRONMENT ??
    "production") as APIEnvironment;
  const apiClient = ApiClient({
    apiKey: process.env.NEXT_PUBLIC_COIN_VOYAGE_API_KEY,
    environment,
  });

  return apiClient.createSaleOrder(
    {
      amount: props.valueUsd.toString(),
      fiat_unit: "USD",
      metadata: props.metadata,
    },
    process.env.COIN_VOYAGE_API_SECRET,
  );
}
